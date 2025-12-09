import sys
import os
import time
import urllib.request
import urllib.error

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

def wait_for_backend(url="http://localhost:8000/", timeout=5):
    start_time = time.time()
    print("Waiting for backend...")
    while time.time() - start_time < timeout:
        try:
            with urllib.request.urlopen(url) as response:
                if response.status == 200:
                    print("Backend is up!")
                    return True
        except urllib.error.URLError:
            pass
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(1)
        print(".", end="", flush=True)
    print("\nBackend failed to start (or is not running locally).")
    return False

if __name__ == "__main__":
    if not wait_for_backend():
        sys.exit(1)
