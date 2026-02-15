import asyncio
from app.infrastructure.database import engine, Base
# Import all models to ensure they are registered with Base metadata
from app.infrastructure.models import User, Feature, WhyItem, Template, Invitation, FAQ, News, GooglePack, Multimedia

async def init_tables():
    print("Creating tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Tables created successfully.")

if __name__ == "__main__":
    asyncio.run(init_tables())
