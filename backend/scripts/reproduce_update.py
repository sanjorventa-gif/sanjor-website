import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import urllib.request
import urllib.parse
import json
import sys

def get_token():
    url = "http://localhost:8000/api/v1/login/access-token"
    data = urllib.parse.urlencode({
        "username": "admin@sanjor.com.ar",
        "password": "sanjor2024"
    }).encode()
    
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            body = json.loads(response.read().decode())
            return body["access_token"]
    raise Exception("Failed to login")

def test_update():
    try:
        token = get_token()
        print("Got access token.")
    except Exception as e:
        print(f"Login failed: {e}")
        return

    # Try to update product with ID 1 (assuming it exists from seed)
    product_id = 1
    url = f"http://localhost:8000/api/v1/products/{product_id}"
    
    payload = {
        "name": "Updated Product Name",
        "description": "Updated description"
    }
    data = json.dumps(payload).encode()
    
    req = urllib.request.Request(url, data=data, method="PUT")
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {token}")
    
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
    test_update()
