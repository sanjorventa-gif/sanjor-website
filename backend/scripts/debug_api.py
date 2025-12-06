import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import urllib.request
import json
import socket

url = "http://localhost:8000/api/v1/products/"

try:
    print("Attempting to connect...")
    with urllib.request.urlopen(url, timeout=5) as response:
        data = response.read()
        products = json.loads(data)
        print(f"API Status: {response.status}")
        print(f"Products count: {len(products)}")
except socket.timeout:
    print("API Error: Connection timed out")
except Exception as e:
    print(f"API Error: {e}")
