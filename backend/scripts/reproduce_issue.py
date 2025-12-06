import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import urllib.request
import urllib.parse
import json

def test_login():
    url = "http://localhost:8000/api/v1/login/access-token"
    data = urllib.parse.urlencode({
        "username": "admin@sanjor.com.ar",
        "password": "sanjor2024"
    }).encode()
    
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status Code: {response.status}")
            print(f"Response Body: {response.read().decode()}")
    except urllib.error.HTTPError as e:
        print(f"Request failed: {e.code} {e.reason}")
        print(f"Error Body: {e.read().decode()}")
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_login()
