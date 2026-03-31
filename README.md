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

# Screenshot-
<img width="1924" height="1024" alt="image" src="https://github.com/user-attachments/assets/34e346dd-f65e-439e-bd2c-53ee86625a07" />
<img width="1924" height="1024" alt="image" src="https://github.com/user-attachments/assets/da4adc94-2736-4089-9d74-ae06b8258b32" />

<img width="1924" height="1024" alt="image" src="https://github.com/user-attachments/assets/f565ebce-df10-40b6-90fb-8b0e7e722ffe" />
<img width="1924" height="1024" alt="image" src="https://github.com/user-attachments/assets/079d7479-bb62-4664-be7c-e00f206f7da2" />




