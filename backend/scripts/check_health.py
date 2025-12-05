import requests
import time

def check_health():
    url = "http://localhost:8000/"
    for i in range(10):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print("Backend is UP!")
                return
        except requests.exceptions.ConnectionError:
            print(f"Waiting for backend... ({i+1}/10)")
            time.sleep(1)
    print("Backend failed to start.")

if __name__ == "__main__":
    check_health()
