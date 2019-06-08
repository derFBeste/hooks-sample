from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class KnexMigrations(Base):
    __tablename__ = 'knex_migrations'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    batch = Column(String) # what should this type be?
    migration_time = Column(DateTime)

    
    # def __init__(self, name=None, email=None):
    #     self.name = name
    #     self.email = email

    # def __repr__(self):
    #     return '<User %r>' % (self.name)