College Club Management System

A web-based application to manage college clubs, members, and events with secure authentication and role-protected access.

Tech Stack

-Frontend: React (Vite)

-Backend & Database: Supabase (PostgreSQL + Auth)

-Routing: React Router

-Styling: CSS



Features
User Authentication

-User registration using email and password

-User login and logout

-Protected routes for authenticated users

-Session management using Supabase Auth

Club Member Management

-Add new members with name, email, department, and joining date

-Display all members in a clean table

-Search members by name or department

-Delete member records

Events Management

-Create events with title, date, description, and venue

-View all upcoming events

-Simple attendance marking using a checkbox

-Event data persists after page refresh

Dashboard

-Displays total number of members

-Displays total number of events

-Loading states and basic error handling

-Clean and responsive UI

Project Structure

src
├── components
│ └── Navbar.jsx
├── pages
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── Members.jsx
│ └── Events.jsx
├── services
│ └── supabaseClient.js
├── App.jsx
├── main.jsx
└── index.css

Database Design (Supabase)

-Tables used:

  members

  events

Row Level Security (RLS) is enabled.
Policies allow authenticated users to perform CRUD operations on tables.

How to Run the Project Locally

Clone the repository
  git clone https://github.com/Sahara1102/college-club-management

Navigate to the project folder
  cd college-club-management

Install dependencies
  npm install

Create a .env file in the root directory and add:
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Start the development server
  npm run dev

Notes

  Attendance is implemented as a simple boolean at the event level to satisfy the requirement for simple attendance marking.

  The system can be extended in the future to support per-member attendance using a relational table