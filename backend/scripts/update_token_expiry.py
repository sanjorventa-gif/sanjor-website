from pathlib import Path
import re

env_path = Path("t:/PROYECTOS/SANJORVENTA-GIF/sanjor-website/.env")
content = env_path.read_text("utf-8")

# Replace existing line or append if missing
if re.search(r"^ACCESS_TOKEN_EXPIRE_MINUTES=", content, re.MULTILINE):
    content = re.sub(
        r"^ACCESS_TOKEN_EXPIRE_MINUTES=.*$", 
        "ACCESS_TOKEN_EXPIRE_MINUTES=540", 
        content, 
        flags=re.MULTILINE
    )
else:
    content += "\nACCESS_TOKEN_EXPIRE_MINUTES=540"

env_path.write_text(content, "utf-8")
print("Updated .env")
