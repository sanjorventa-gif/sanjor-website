import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Any, Dict, Optional
from jinja2 import Environment, FileSystemLoader
from app.core.config import settings
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Setup Jinja2 Environment
templates_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "templates")
env = Environment(loader=FileSystemLoader(templates_dir))

def send_email(
    email_to: str,
    subject: str = "",
    template_name: str = "",
    environment: Dict[str, Any] = {},
    reply_to: Optional[str] = None
) -> None:
    """
    Send an email using the configured SMTP server.
    """
    assert settings.EMAILS_FROM_EMAIL, "EMAILS_FROM_EMAIL must be set"

    try:
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = f"{settings.EMAILS_FROM_NAME} <{settings.EMAILS_FROM_EMAIL}>"
        message["To"] = email_to
        
        if reply_to:
            message["Reply-To"] = reply_to

        # Render Template
        template = env.get_template(template_name)
        html_content = template.render(**environment)
        
        part = MIMEText(html_content, "html")
        message.attach(part)

        # SMTP Connection
        # DonWeb typically uses SSL on 465 or STARTTLS on 587. 
        # Using SSL (SMTP_SSL) for port 465 is standard.
        if settings.SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT)
        else:
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            server.starttls()

        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.EMAILS_FROM_EMAIL, email_to, message.as_string())
        server.quit()
        
        logger.info(f"Email sent to {email_to}: {subject}")

    except Exception as e:
        logger.error(f"Failed to send email to {email_to}: {e}")
        # In production we might want to re-raise or handle gracefully depending on importance
