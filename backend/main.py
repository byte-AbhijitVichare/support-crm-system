from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from schemas import TicketCreate, TicketUpdate
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from models import Ticket, Note
from fastapi.responses import FileResponse
import pandas as pd
import models
import uuid

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Home route
@app.get("/")
def home():
    return {"message": "Support CRM API Running"}

# Create Ticket API
@app.post("/api/tickets")
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):

    last_ticket = db.query(Ticket).order_by(Ticket.id.desc()).first()

    if last_ticket:
        next_id = last_ticket.id + 1
    else:
        next_id = 1

    ticket_number = f"TKT-{next_id:03d}"

    new_ticket = Ticket(
        ticket_id=ticket_number,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        priority=ticket.priority,
        assigned_to="Support Agent"
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket_id": new_ticket.ticket_id,
        "status": new_ticket.status
    }

@app.get("/api/tickets")
def get_tickets(db: Session = Depends(get_db)):

    tickets = db.query(Ticket).all()

    return tickets

@app.get("/api/tickets/{ticket_id}")
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        return {"error": "Ticket not found"}

    return ticket

@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        return {"error": "Ticket not found"}

    ticket.status = ticket_data.status
    ticket.notes = ticket_data.notes
    ticket.assigned_to = ticket_data.assigned_to
    ticket.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)

    return {
        "message": "Ticket updated successfully",
        "status": ticket.status
    }

@app.delete("/api/tickets/{ticket_id}")
def delete_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        return {"error": "Ticket not found"}

    db.delete(ticket)
    db.commit()

    return {
        "message": "Ticket deleted successfully"
    }

@app.get("/api/export")
def export_tickets(db: Session = Depends(get_db)):

    tickets = db.query(Ticket).all()

    data = []

    for ticket in tickets:
        data.append({
            "Ticket ID": ticket.ticket_id,
            "Customer": ticket.customer_name,
            "Email": ticket.customer_email,
            "Subject": ticket.subject,
            "Status": ticket.status,
            "Priority": ticket.priority,
            "Assigned To": ticket.assigned_to,
            "Notes": ticket.notes
        })

    df = pd.DataFrame(data)

    file_name = "tickets_export.csv"

    df.to_csv(file_name, index=False)

    return FileResponse(
        file_name,
        media_type="text/csv",
        filename=file_name
    )