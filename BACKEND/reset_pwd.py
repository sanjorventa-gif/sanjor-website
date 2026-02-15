import asyncio
from app.infrastructure.database import SessionLocal
from app.infrastructure.models import User
from app.core.security import get_password_hash
from sqlalchemy import select, update

async def reset_admin_password():
    async with SessionLocal() as session:
        # Fetch user
        result = await session.execute(select(User).where(User.email == "admin@webinvita.com"))
        user = result.scalars().first()
        
        new_password = "admin"
        hashed = get_password_hash(new_password)
        
        if user:
            print(f"User found: {user.email}. ID: {user.id}")
            # Update password
            stmt = update(User).where(User.id == user.id).values(hashed_password=hashed)
            await session.execute(stmt)
            await session.commit()
            print(f"Password reset to '{new_password}' successfully.")
        else:
            print("User admin@webinvita.com not found. Creating it.")
            new_user = User(
                email="admin@webinvita.com",
                hashed_password=hashed,
                is_active=True,
                is_superuser=True
            )
            session.add(new_user)
            await session.commit()
            print(f"User created with password '{new_password}'.")

if __name__ == "__main__":
    asyncio.run(reset_admin_password())
