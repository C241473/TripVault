# 🗺️ TripVault — Travel Memory Journal (Week 1 & Week 2)

> **Virtual Internship Program • Full Stack (MERN) | Powered by CodGen**  
> **Theme:** Week 1: Setup & Authentication | Week 2: Trip Management — CRUD Operations  
> **Stack:** Node.js • Express • MongoDB • React (Vite)

TripVault is a travel memory journal web application where users can log trips, upload photos, and share memories. Week 2 adds full **CRUD (Create, Read, Update, Delete)** operations for trip management, allowing users to create, view, edit, and delete their travel entries securely.

---

## 📁 Repository Structure

```text
tripvault/
├── client/                     # React (Vite) Frontend
│   ├── src/
│   │   ├── components/         # Navbar, ProtectedRoute, TripCard, TripModal
│   │   ├── context/            # AuthContext (JWT & state management)
│   │   ├── pages/              # Home, Login, Register, Dashboard
│   │   ├── App.jsx             # Main App router
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   └── package.json
├── server/                     # Node.js + Express Backend
│   ├── models/                 # User.js, Trip.js (Mongoose Schemas)
│   ├── routes/                 # auth.js, trips.js (Auth & Trip CRUD Routes)
│   ├── middleware/             # authMiddleware.js (JWT Verification)
│   ├── .env                    # Environment config
│   ├── .env.example            # Environment variables template
│   ├── index.js                # Express Server entry point
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Features Built

### Week 1: Authentication & Setup
- **User Model**: User model with `name`, `email` (unique), `password` (hashed with `bcryptjs`), and timestamps.
- **Registration**: `POST /api/auth/register` creates user & returns JWT token.
- **Login**: `POST /api/auth/login` verifies credentials & returns JWT token.
- **Protected Endpoint**: `GET /api/auth/me` returns authenticated user profile.
- **Frontend Auth**: React Router setup, JWT stored in `localStorage`, `<ProtectedRoute />` guard, and glassmorphic UI.

### Week 2: Trip Management (CRUD Operations)
- **Trip Model (`server/models/Trip.js`)**:
  - `title` (String, required)
  - `destination` (String, required)
  - `startDate` & `endDate` (Date)
  - `description` (String)
  - `rating` (Number, 1-5 stars)
  - `user` (ObjectId, ref: 'User', required)
- **Protected Trip API (`/api/trips`)**:
  - `POST /api/trips`: Create a new trip for logged-in user.
  - `GET /api/trips`: Get all trips belonging to logged-in user only.
  - `GET /api/trips/:id`: Get single trip (verifies user ownership).
  - `PUT /api/trips/:id`: Update trip (verifies user ownership before saving).
  - `DELETE /api/trips/:id`: Delete trip (verifies user ownership with confirmation prompt).
- **Dynamic Dashboard UI**:
  - Displays dynamic **"Trips Logged"** counter (`0, 1, 2, 3...`) matching user's trip count.
  - Trip Cards displaying title, destination, dates, description, star rating (⭐ 1-5), Edit button, and Delete button.
  - Create and Edit Modal forms with field validation and loading indicators.
  - Friendly empty state when user has no trips yet.

---

## 🧪 API Endpoints Overview

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user (`name`, `email`, `password`) | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token (`email`, `password`) | Public |
| `GET` | `/api/auth/me` | Fetch currently logged-in user profile | Protected |

### Trip Routes (`/api/trips`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips` | Create a new trip for the logged-in user | Protected |
| `GET` | `/api/trips` | Get all trips belonging to the logged-in user | Protected |
| `GET` | `/api/trips/:id` | Get a single trip by ID (Owner only) | Protected |
| `PUT` | `/api/trips/:id` | Update trip fields (title, destination, dates, rating, etc.) | Protected |
| `DELETE` | `/api/trips/:id` | Permanently delete a trip (Owner only) | Protected |

---

## 🛠️ Setup & Run Guide

### 1️⃣ Server Setup
```bash
cd server
npm install
npm start
```
*Runs on port 5000: `http://localhost:5000`*

### 2️⃣ Client Setup
```bash
cd client
npm install
npm run dev
```
*Runs on port 5173: `http://localhost:5173`*

---

*Powered by CodGen Virtual Internship Program* 🚀
