import sys
import os

print(f"Python Executable: {sys.executable}")
print(f"CWD: {os.getcwd()}")
print("Sys Path:")
for p in sys.path:
    print(f"  {p}")

try:
    import requests
    print(f"Requests module found at: {requests.__file__}")
except ImportError as e:
    print(f"Failed to import requests: {e}")

try:
    import uvicorn
    print(f"Uvicorn module found at: {uvicorn.__file__}")
except ImportError as e:
    print(f"Failed to import uvicorn: {e}")
