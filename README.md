# 🗺️ TripVault — Travel Memory Journal (Week 1)

> **Virtual Internship Program • Full Stack (MERN) | Powered by CodGen**  
> **Theme:** Project Setup & Authentication  
> **Stack:** Node.js • Express • MongoDB • React (Vite)

TripVault is a travel memory journal web application where users can log trips, upload photos, and share memories. Week 1 lays the complete foundation of the project with a robust Node.js/Express backend server, MongoDB database integration, and a React (Vite) frontend with full JWT authentication flow.

---

## 📁 Repository Structure

```text
tripvault/
├── client/                     # React (Vite) Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, ProtectedRoute)
│   │   ├── context/            # Global AuthContext (JWT & state management)
│   │   ├── pages/              # Home, Login, Register, Dashboard
│   │   ├── App.jsx             # Main App router
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   └── package.json
├── server/                     # Node.js + Express Backend
│   ├── models/                 # User.js (Mongoose Schema)
│   ├── routes/                 # auth.js (Register, Login, Me)
│   ├── middleware/             # authMiddleware.js (JWT Verification)
│   ├── .env                    # Environment config
│   ├── .env.example            # Environment variables template
│   ├── index.js                # Express Server entry point
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Features Built (Week 1)

### Backend (Express + MongoDB)
- **Database Model**: User model with `name`, `email` (unique), `password` (hashed), and timestamps.
- **Password Hashing**: Secure password hashing using `bcryptjs` before saving users.
- **Registration Endpoint**: `POST /api/auth/register` creates new user and returns JWT token.
- **Login Endpoint**: `POST /api/auth/login` validates user credentials and returns JWT token.
- **Protected Endpoint**: `GET /api/auth/me` returns current authenticated user information.
- **Security & CORS**: CORS enabled and `.env` configured for secrets protection.

### Frontend (React + Vite)
- **Vite Integration**: React application configured with Vite for lightning-fast build performance.
- **Routing**: `react-router-dom` setup with routes (`/`, `/login`, `/register`, `/dashboard`).
- **Protected Route Guard**: `<ProtectedRoute />` protects `/dashboard` and redirects unauthenticated users to `/login`.
- **JWT Storage**: JWT token persisted in `localStorage` with `AuthContext` managing global auth state.
- **UI Design**: Modern, responsive UI with interactive forms, loading indicators, error feedback, and quick user actions.

---

## 🛠️ Getting Started / Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI)

---

### 1️⃣ Setting Up the Backend Server

Navigate to the `server` directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file inside the `server/` directory (or copy `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tripvault
JWT_SECRET=tripvault_secret_key_codgen_2026
```
*(Replace `MONGO_URI` with your MongoDB Atlas connection string if using cloud database)*

Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run at: **`http://localhost:5000`**

---

### 2️⃣ Setting Up the Frontend Client

Open a new terminal window and navigate to the `client` directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The frontend app will run at: **`http://localhost:5173`**

---

## 🧪 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user (`name`, `email`, `password`) | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token (`email`, `password`) | Public |
| `GET` | `/api/auth/me` | Fetch currently logged-in user profile | Protected (Requires `Authorization: Bearer <token>`) |

---

## 🔒 Security Best Practices
- Passwords are never stored in plain text.
- Environment variables (`.env`) are excluded via `.gitignore`.
- JWT tokens expire in 7 days and are verified on all protected server endpoints.

---

*Powered by CodGen Virtual Internship Program* 🚀
