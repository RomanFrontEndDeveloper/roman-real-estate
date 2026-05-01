# RomanRealEstate 🏡

Fullstack real estate platform with authentication, property management, and modern UI.

---

## 🚀 Overview

RomanRealEstate is a fullstack web application that allows users to create, manage, and explore real estate listings.

The project is built with a focus on real-world architecture, including authentication, API integration, file uploads, and deployment.

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack Query (React Query)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Multer (file uploads)

### Deployment

- Frontend: Vercel
- Backend: Render

---

## ⚙️ Features

### 🔐 Authentication

- User registration & login
- JWT-based authentication
- Protected API routes

### 🏠 Properties

- Create property with image upload
- View all properties (with filters & pagination)
- View single property page
- Edit property (partial implementation)
- Delete property

### ❤️ User Features

- Add/remove favorites
- Fetch current user data

### 🎨 UI/UX

- Responsive design
- Modern card-based layout
- Image preview & gallery
- Toast notifications
- Loading & error states

---

## 📁 Project Structure

```
client/
  app/          # Next.js routes (App Router)
  entities/     # Business logic (API, types)
  shared/       # UI components

server/
  controllers/  # Request handlers
  routes/       # API routes
  models/       # Mongoose models
  middleware/   # Auth & error handling
  services/     # Business logic
```

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/your-username/roman-real-estate.git
cd roman-real-estate
```

---

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3. Environment variables

Create `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 4. Run project

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm run dev
```

---

## 🌐 API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/properties
GET    /api/properties/:id
GET    /api/properties/my

POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id

POST   /api/users/favorites
GET    /api/users/me
```

---

## 🔐 Authentication Flow

1. User logs in → receives JWT token
2. Token is stored on client
3. Token is sent via Authorization header
4. Backend verifies token (middleware)
5. User gets access to protected routes

---

## 📦 File Upload

- Images are uploaded using `multipart/form-data`
- Stored on server (`/uploads`)
- Served as static files via Express

---

## 🚀 Deployment

- Frontend deployed on Vercel
- Backend deployed on Render

---

## 📌 Project Goal

This project is designed to simulate a real production-ready fullstack application
and demonstrate skills required for a Junior / Strong Junior / Middle Frontend Developer role.

---

## 📧 Contact

**Roman Okhremov**
Frontend / Fullstack Developer

- Email: [romariotraveler@gmail.com](mailto:romariotraveler@gmail.com)
- Telegram: @T168234
