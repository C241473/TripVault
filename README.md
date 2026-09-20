# 🗺️ TripVault — Travel Memory Journal (Week 1, Week 2 & Week 3)

> **Virtual Internship Program • Full Stack (MERN) | Powered by CodGen**  
> **Theme:**  
> - Week 1: Project Setup & Authentication  
> - Week 2: Trip Management — CRUD Operations  
> - Week 3: Photo Uploads (Cloudinary + Multer) & Public User Profiles (`/profile/:username`)  
> **Stack:** Node.js • Express • MongoDB • React (Vite) • Cloudinary • Multer

TripVault is a travel memory journal web application where users can log trips, upload photos, and share public profiles. Week 3 introduces cloud photo storage with Cloudinary and Multer, trip photo galleries, and public traveller profiles (`/profile/:username`) accessible without login.

---

## 📁 Repository Structure

```text
tripvault/
├── client/                     # React (Vite) Frontend
│   ├── src/
│   │   ├── components/         # Navbar, ProtectedRoute, TripCard, TripModal, TripDetailModal, EditProfileModal
│   │   ├── context/            # AuthContext (JWT & state management)
│   │   ├── pages/              # Home, Login, Register, Dashboard, PublicProfile
│   │   ├── App.jsx             # Main App router
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   └── package.json
├── server/                     # Node.js + Express Backend
│   ├── models/                 # User.js (username, bio), Trip.js (coverImage, photos)
│   ├── routes/                 # auth.js, trips.js, users.js (Public & Protected APIs)
│   ├── middleware/             # authMiddleware.js, upload.js (Multer + Cloudinary)
│   ├── .env                    # Environment config (CLOUDINARY credentials)
│   ├── .env.example            # Environment variables template
│   ├── index.js                # Express Server entry point
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Features Built

### Week 1: Authentication & Setup
- User model with password hashing (`bcryptjs`) & JWT token authentication.
- Auth pages (Register, Login, Protected Dashboard) with React Router & AuthContext.

### Week 2: Trip Management (CRUD Operations)
- Full CRUD operations (`POST`, `GET`, `GET /:id`, `PUT /:id`, `DELETE /:id`) for trip entries.
- Ownership authorization on all trip mutations.

### Week 3: Photo Uploads & Public Profiles
- **Photo Uploads (Cloudinary + Multer)**:
  - `POST /api/trips/:id/upload`: Protected route uploading image via Multer/Cloudinary, setting `coverImage` & appending to `photos` array.
  - File upload input on Create & Edit forms with live photo previews and preset travel photos.
  - Interactive `TripDetailModal` showing full photo grid gallery per trip.
- **Public User Profiles (`/profile/:username`)**:
  - User model updated with `username` (unique, required) and `bio` (optional).
  - `GET /api/users/:username/profile`: **Public route (No auth required)** returning safe profile info (`name`, `username`, `bio`, `createdAt`) and all public trips. Excludes sensitive `email` & `password`.
  - `PUT /api/users/profile`: Protected route allowing logged-in user to update `bio` and `username`.
  - Public React page at `/profile/:username` viewable without logging in.

---

## 🧪 API Endpoints Reference

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register user (`name`, `email`, `password`) | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Protected |

### Trip Routes (`/api/trips`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips` | Create a new trip | Protected |
| `GET` | `/api/trips` | Get logged-in user's trips | Protected |
| `GET` | `/api/trips/:id` | Get single trip details | Protected |
| `PUT` | `/api/trips/:id` | Update trip details | Protected |
| `DELETE` | `/api/trips/:id` | Delete a trip | Protected |
| `POST` | `/api/trips/:id/upload` | Upload photo & attach Cloudinary URL to trip | Protected |

### User Profile Routes (`/api/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/:username/profile` | Fetch public profile & public trips (Safe fields only) | **Public** |
| `PUT` | `/api/users/profile` | Update logged-in user's bio or username | Protected |

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
