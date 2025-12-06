import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import urllib.request
import json

url = "http://localhost:8000/api/v1/register"
data = {
    "email": "tomyamigos2@gmail.com",
    "password": "password123"
}
json_data = json.dumps(data).encode('utf-8')

req = urllib.request.Request(url, data=json_data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.status}")
        print(f"Response: {response.read().decode('utf-8')}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(f"Response: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
