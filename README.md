Kanban Board (Full Stack Project)
A real-time collaborative Kanban board where users can create boards,lists, and tasks, and track progress visually.

1.Features-
- User Authentication (Login/Register)
- Create Boards
- Create Lists (To Do, In Progress, Done)
- Add / Delete Tasks
- Drag and Drop Tasks
- Team collaboration (invite users)
- Real-time updates (WebSocket)

2.Tech Stack-

Frontend: React js, Axios (API handling),Tailwind CSS (styling),
          React Toastify (notifications),React Router DOM (routing) 
          
Backend: Django / Django REST Framework  

Database: SQLite (default) 

3.Folder Structure-
backend/ → Django backend (APIs, authentication, database)
frontend/ → React frontend (UI, components)

4.Installation & Setup-

# Clone repo
git clone https://github.com/rupalikanayak07/kanban-Board.git

# Backend Setup

cd kanban_backend

Create virtual environment - python -m venv myenv

Activate environment - myenv\Scripts\activate (Windows)

Install django - pip install django

Install restframework - pip install djangorestframework

Run server - python manage.py runserver

# Frontend Setup

cd frontend

Install dependencies (React + all libraries like Axios, Tailwind, Toastify, Router) - npm install

Start development server - npm run dev
