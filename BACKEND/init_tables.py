import asyncio
from app.infrastructure.database import engine, Base
# Import all models to ensure they are registered in Base
from app.infrastructure.models import *

async def init_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Tables created.")

if __name__ == "__main__":
    asyncio.run(init_tables())
