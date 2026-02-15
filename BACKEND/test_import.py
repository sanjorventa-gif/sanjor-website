
try:
    from app.application.services.google_service import google_service
    print("Import successful")
    print(f"Service initialized: {google_service}")
except Exception as e:
    print(f"Import failed: {e}")
    import traceback
    traceback.print_exc()
