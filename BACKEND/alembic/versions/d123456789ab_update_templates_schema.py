"""Update templates schema

Revision ID: d123456789ab
Revises: cbc2e15fddc2
Create Date: 2026-02-06 14:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'd123456789ab'
down_revision: Union[str, None] = '1150aeaada0c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Use batch_alter_table to support SQLite and Postgres
    with op.batch_alter_table('templates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('slug', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('categories', sa.JSON(), nullable=True))
        batch_op.add_column(sa.Column('show_on_home', sa.Boolean(), nullable=True))
        batch_op.create_index(batch_op.f('ix_templates_slug'), ['slug'], unique=True)
        # We try to drop 'category' if it exists. 
        # Note: In a raw SQL migration we might need to be careful, but batch_op handles it generally.
        batch_op.drop_column('category')


def downgrade() -> None:
    with op.batch_alter_table('templates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.VARCHAR(length=50), nullable=True, server_default=sa.text("'GENERAL'")))
        batch_op.drop_index(batch_op.f('ix_templates_slug'))
        batch_op.drop_column('show_on_home')
        batch_op.drop_column('categories')
        batch_op.drop_column('slug')
