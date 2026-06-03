from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String, unique=True)

    customer_name = Column(String)
    customer_email = Column(String)

    subject = Column(String)
    description = Column(String)

    status = Column(String, default="Open")

    priority = Column(String, default="Medium")
    assigned_to = Column(String, default="Unassigned")
    
    notes = Column(String, default="")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    ticket_id = Column(String)

    note_text = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )