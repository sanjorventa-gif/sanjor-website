
import logging
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from app.core.config import settings
from app.infrastructure.models import GooglePack, Invitation
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
import asyncio
from functools import partial
import time

logger = logging.getLogger(__name__)

SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/forms"
]

class GoogleAssetsService:
    def __init__(self):
        self.creds = None
        if settings.GOOGLE_OAUTH_REFRESH_TOKEN:
            self.creds = Credentials(
                None, # No access token initially
                refresh_token=settings.GOOGLE_OAUTH_REFRESH_TOKEN,
                token_uri="https://oauth2.googleapis.com/token",
                client_id=settings.GOOGLE_OAUTH_CLIENT_ID,
                client_secret=settings.GOOGLE_OAUTH_CLIENT_SECRET,
                scopes=SCOPES
            )
        
        self.drive = None
        self.sheets = None
        self.forms = None

    def _get_services(self):
        if not self.creds:
            raise Exception("Google Credentials not configured")
        
        # Build services if not already built
        if not self.drive:
            self.drive = build('drive', 'v3', credentials=self.creds)
        if not self.sheets:
            self.sheets = build('sheets', 'v4', credentials=self.creds)
        if not self.forms:
            self.forms = build('forms', 'v1', credentials=self.creds)
        
        return self.drive, self.sheets, self.forms

    def _create_folder(self, name, parent_id):
        drive, _, _ = self._get_services()
        file_metadata = {
            'name': name,
            'mimeType': 'application/vnd.google-apps.folder',
            'parents': [parent_id]
        }
        file = drive.files().create(body=file_metadata, fields='id, webViewLink').execute()
        return file.get('id'), file.get('webViewLink')

    def _copy_file(self, file_id, name, parent_id):
        drive, _, _ = self._get_services()
        body = {
            'name': name,
            'parents': [parent_id]
        }
        # Copy returns the new file
        new_file = drive.files().copy(fileId=file_id, body=body, fields='id, webViewLink').execute()
        return new_file.get('id'), new_file.get('webViewLink')

    def _create_sheet(self, title, folder_id):
        drive, sheets, _ = self._get_services()
        
        # 1. Create Spreadsheet
        spreadsheet_body = {
            'properties': {
                'title': title
            }
        }
        spreadsheet = sheets.spreadsheets().create(body=spreadsheet_body, fields='spreadsheetId,spreadsheetUrl').execute()
        sheet_id = spreadsheet.get('spreadsheetId')
        sheet_url = spreadsheet.get('spreadsheetUrl')
        
        # 2. Move to folder (drive API)
        # Retrieve current parents to remove them
        file = drive.files().get(fileId=sheet_id, fields='parents').execute()
        previous_parents = ",".join(file.get('parents'))
        
        drive.files().update(
            fileId=sheet_id,
            addParents=folder_id,
            removeParents=previous_parents,
            fields='id, parents'
        ).execute()
        
        return sheet_id, sheet_url

    def _get_form_urls(self, form_id):
        # Forms API to get Responder URI? 
        # Actually standard Edit URL is https://docs.google.com/forms/d/{id}/edit
        # Responder is https://docs.google.com/forms/d/{id}/viewform
        # Can verify via API if needed, but constructing is widely standard.
        return {
            "edit": f"https://docs.google.com/forms/d/{form_id}/edit",
            "public": f"https://docs.google.com/forms/d/{form_id}/viewform"
        }

    async def create_pro_google_pack(self, db: AsyncSession, invitation_id: int):
        """
        Main orchestration method. Runs sync calls in threadpool.
        """
        # 1. Fetch Invitation
        stmt = select(Invitation).filter(Invitation.id == invitation_id)
        result = await db.execute(stmt)
        invitation = result.scalars().first()
        
        if not invitation:
            raise HTTPException(status_code=404, detail="Invitation not found")
        
        # 2. Check if pack exists
        stmt_pack = select(GooglePack).filter(GooglePack.invitation_id == invitation_id)
        res_pack = await db.execute(stmt_pack)
        existing_pack = res_pack.scalars().first()
        
        if existing_pack and existing_pack.status == "success":
            return existing_pack # Idempotency
        
        if not existing_pack:
            existing_pack = GooglePack(invitation_id=invitation_id, status="processing")
            db.add(existing_pack)
            await db.commit()
            await db.refresh(existing_pack)

        # 3. Run Google Operations
        try:
            # We run the blocking _process_google_assets in a thread
            loop = asyncio.get_event_loop()
            pack_data = await loop.run_in_executor(None, partial(self._process_google_assets, invitation))
            
            # 4. Update DB
            existing_pack.drive_folder_id = pack_data['folder_id']
            existing_pack.drive_folder_url = pack_data['folder_url']
            
            existing_pack.rsvp_form_id = pack_data['rsvp_form_id']
            existing_pack.rsvp_form_url = pack_data['rsvp_form_public']
            existing_pack.rsvp_form_edit_url = pack_data['rsvp_form_edit']
            existing_pack.rsvp_sheet_id = pack_data['rsvp_sheet_id']
            existing_pack.rsvp_sheet_url = pack_data['rsvp_sheet_url']
            
            existing_pack.songs_form_id = pack_data['songs_form_id']
            existing_pack.songs_form_url = pack_data['songs_form_public']
            existing_pack.songs_form_edit_url = pack_data['songs_form_edit']
            existing_pack.songs_sheet_id = pack_data['songs_sheet_id']
            existing_pack.songs_sheet_url = pack_data['songs_sheet_url']
            
            existing_pack.status = "success"
            await db.commit()
            return existing_pack
            
        except Exception as e:
            logger.error(f"Error creating Google Pack: {e}")
            existing_pack.status = "failed"
            existing_pack.error_message = str(e)
            await db.commit()
            raise HTTPException(status_code=500, detail=f"Google Integration Failed: {str(e)}")

    def _process_google_assets(self, invitation):
        """
        Synchronous logic to call Google APIs
        """
        # Prefer eventName, then names, then slug
        customer_name = invitation.content.get('eventName') or invitation.content.get('names') or invitation.slug or f"Inv-{invitation.id}"
        folder_name = f"{customer_name} ({invitation.id}) - PRO ASSETS"
        
        # A. Create Folder
        folder_id, folder_url = self._create_folder(folder_name, settings.GOOGLE_PRO_CLIENTS_FOLDER_ID)
        time.sleep(1)

        # Get features list safely
        features = invitation.content.get('features', [])
        
        # B. RSVP (Only if feature is enabled)
        rsvp_data = {
            "rsvp_form_public": None,
            "rsvp_form_edit": None,
            "rsvp_sheet_url": None,
            "rsvp_form_id": None,
            "rsvp_sheet_id": None
        }
        
        if "Confirmación de asistencia (RSVP)" in features:
            try:
                rsvp_form_id, _ = self._copy_file(
                    settings.GOOGLE_TEMPLATE_RSVP_FORM_ID,
                    f"RSVP - {customer_name}",
                    folder_id
                )
                time.sleep(1)
                rsvp_sheet_id, rsvp_sheet_url = self._create_sheet(
                    f"Respuestas RSVP - {customer_name}",
                    folder_id
                )
                rsvp_urls = self._get_form_urls(rsvp_form_id)
                time.sleep(1)
                
                rsvp_data = {
                    "rsvp_form_public": rsvp_urls['public'],
                    "rsvp_form_edit": rsvp_urls['edit'],
                    "rsvp_sheet_url": rsvp_sheet_url,
                    "rsvp_form_id": rsvp_form_id,
                    "rsvp_sheet_id": rsvp_sheet_id
                }
            except Exception as e:
                logger.error(f"Error creating RSVP assets: {e}")

        # C. Songs (Only if feature is enabled - called 'Playlist' in frontend)
        songs_data = {
            "songs_form_public": None,
            "songs_form_edit": None,
            "songs_sheet_url": None,
            "songs_form_id": None,
            "songs_sheet_id": None
        }

        if "Playlist" in features:
            try:
                songs_form_id, _ = self._copy_file(
                    settings.GOOGLE_TEMPLATE_SONGS_FORM_ID,
                    f"Canciones - {customer_name}",
                    folder_id
                )
                time.sleep(1)
                songs_sheet_id, songs_sheet_url = self._create_sheet(
                    f"Respuestas Canciones - {customer_name}",
                    folder_id
                )
                songs_urls = self._get_form_urls(songs_form_id)
                
                songs_data = {
                    "songs_form_public": songs_urls['public'],
                    "songs_form_edit": songs_urls['edit'],
                    "songs_sheet_url": songs_sheet_url,
                    "songs_form_id": songs_form_id,
                    "songs_sheet_id": songs_sheet_id
                }
            except Exception as e:
                logger.error(f"Error creating Songs assets: {e}")
        
        return {
            "folder_id": folder_id,
            "folder_url": folder_url,
            **rsvp_data,
            **songs_data
        }

google_service = GoogleAssetsService()
