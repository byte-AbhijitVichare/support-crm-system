# Support CRM System

A full-stack Customer Support CRM application built using React, FastAPI, SQLite, and Bootstrap. The system allows support teams to create, manage, track, and resolve customer tickets efficiently.

---

## Features

### Ticket Management
- Create support tickets
- Auto-generated Ticket IDs
- View all tickets
- Delete tickets
- View detailed ticket information

### Ticket Tracking
- Track tickets using Ticket ID
- View status updates
- View assigned support agent
- View ticket notes

### Status Management
- Open
- In Progress
- Closed

### Priority Management
- Low Priority
- Medium Priority
- High Priority

### Agent Assignment
- Assign tickets to support agents
- Update assigned agents

### Search & Filtering
- Search by:
  - Ticket ID
  - Customer Name
  - Subject
- Filter tickets by status

### Analytics Dashboard
- Total Tickets
- Open Tickets
- Closed Tickets
- In Progress Tickets
- High Priority Tickets
- Pie Chart Visualization

### Export
- Export ticket data to CSV

### Responsive Design
- Mobile-friendly UI
- Bootstrap-based layout

---

## Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap
- Chart.js
- React ChartJS 2
- Axios

### Backend
- FastAPI
- SQLAlchemy
- Pydantic

### Database
- SQLite

---

## Project Structure

support-crm-system/

├── backend/

│ ├── main.py

│ ├── models.py

│ ├── schemas.py

│ ├── database.py

│

├── frontend/

│ ├── src/

│ │ ├── pages/

│ │ ├── components/

│ │ ├── services/

│

├── README.md

└── requirements.txt

---

## Installation

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Create Ticket

```http
POST /api/tickets
```

### Get All Tickets

```http
GET /api/tickets
```

### Get Ticket Details

```http
GET /api/tickets/{ticket_id}
```

### Update Ticket

```http
PUT /api/tickets/{ticket_id}
```

### Delete Ticket

```http
DELETE /api/tickets/{ticket_id}
```

### Export CSV

```http
GET /api/export
```

---

## Screenshots

### Dashboard

<img src="screenshots/dashboard.png" width="800">

### Ticket Details

<img src="screenshots/ticket-detail.png" width="800">

### Track Ticket

<img src="screenshots/track-ticket.png" width="800">

### Analytics Dashboard

<img src="screenshots/analytics.png" width="800">

---

## Future Enhancements

- User Authentication
- Role-Based Access Control
- Email Notifications
- SLA Tracking
- Ticket Attachments
- Real-time Updates
- Dark Mode

---

## Author

Abhijit Vichare

B.Sc. Data Science & Analytics

Mumbai University

GitHub: https://github.com/yourusername
LinkedIn: https://linkedin.com/in/yourprofile