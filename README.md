# 🏡 RomanRealEstate

Fullstack real estate platform with authentication, property management, and cloud-based image storage.

---

## 🚀 Overview

**RomanRealEstate** is a fullstack web application that allows users to create, manage, and explore real estate listings.

The project simulates a real production-ready system with authentication, API integration, file uploads, and deployment using modern tools.

---

## 🛠 Tech Stack

### 🎨 Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack Query (React Query)

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Multer (memory storage)

### ☁️ Cloud & Services

- Cloudinary (image storage & CDN)
- Streamifier (buffer → stream upload)

### 🚀 Deployment

- Frontend: Vercel
- Backend: Render

---

## ⚙️ Features

### 🔐 Authentication

- User registration & login
- JWT-based authentication
- Protected API routes

### 🏠 Properties

- Create property with image upload (Cloudinary)
- View all properties (filters & pagination)
- View single property page
- Edit property (with image update)
- Delete property

### ❤️ User Features

- Add/remove favorites
- Fetch current user data

### 🎨 UI/UX

- Responsive design
- Modern card-based layout
- Image gallery preview
- Toast notifications
- Loading & error states

---

## 📦 Image Upload (IMPORTANT)

Images are handled using a production-ready pipeline:

Client → FormData → Express → Multer → Cloudinary → MongoDB → Client

- Files are uploaded via `multipart/form-data`
- Stored in **Cloudinary (not locally)**
- Database stores only image URLs
- Images are served via CDN (fast & scalable)

---

## 📁 Project Structure

```
client/
  app/          # Next.js routes (App Router)
  entities/     # API logic & types
  shared/       # UI components

server/
  controllers/  # Request handlers
  routes/       # API routes
  models/       # Mongoose models
  middleware/   # Auth & error handling
  config/       # Cloudinary config
```

---

## ⚙️ Environment Variables

### Backend (`/server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`/client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/RomanFrontEndDeveloper/roman-real-estate.git
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

### 3. Run project

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
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
4. Backend verifies token
5. Access to protected routes is granted

---

## 🚀 Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Images stored in **Cloudinary CDN**

---

## 💡 Key Highlights

- Real-world fullstack architecture
- Cloud-based file storage (no local filesystem issues)
- Type-safe backend (TypeScript)
- REST API with authentication
- Scalable and production-ready setup

---

## 📌 Project Goal

This project demonstrates real-world development skills required for a **Junior / Strong Junior / Middle Frontend Developer** role, including backend integration and API design.

---

## 📧 Contact

**Roman Okhremov**
Frontend / Fullstack Developer

- Email: [romariotraveler@gmail.com](mailto:romariotraveler@gmail.com)
- Telegram: @T168234

---
