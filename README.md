# 🏡 RomanRealEstate

A production-style **fullstack real estate platform** built with modern web technologies.

The application allows users to browse, create, manage, and favorite real estate listings with secure authentication, role-based permissions, cloud image storage, and a scalable architecture.

---

## 🚀 Live Demo

### Frontend

[Live Website](YOUR_VERCEL_URL)

### Backend API

[API Server](YOUR_RENDER_URL)

---

## 📌 Overview

**RomanRealEstate** is a fullstack real estate web application inspired by real-world marketplace platforms.

The project demonstrates practical frontend and backend development skills, including authentication, protected routes, role-based authorization, image uploads, API design, cloud storage, pagination, filtering, and production-ready architecture.

The system supports multiple user roles and ownership-based permissions to ensure secure property management.

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
- Zod Validation
- Multer (memory storage)

### ☁️ Cloud & Services

- Cloudinary (image storage & CDN)
- Streamifier (buffer → stream upload)

### 🚀 Deployment

- Frontend: Vercel
- Backend: Render

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration & login
- JWT-based authentication
- Protected API routes
- Role-based authorization

Roles:

```txt
admin
agent
```

Access control:

- Only property owners can edit/delete their own listings
- Admin can manage all properties

---

### 🏠 Property Management

- Create property listing
- Upload property images to Cloudinary
- View all listings
- View single property details
- Edit property
- Delete property
- Ownership protection

---

### 🔍 Filtering & Search

Users can filter properties by:

- Maximum price
- City district

Additional features:

- Debounced search requests
- Server-side filtering
- Pagination support

---

### ❤️ Favorites System

- Add property to favorites
- Remove property from favorites
- Persistent favorite state

---

### 🎨 UI/UX Features

- Responsive design
- Reusable UI components
- Skeleton loading states
- Toast notifications
- Loading & error handling
- Modern card-based interface
- Image preview gallery

---

## 🧠 Architecture

The project follows a scalable and maintainable architecture.

### Backend Architecture

```txt
routes
→ middleware
→ controller
→ service
→ database
```

Project structure:

```txt
server/src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
```

### Frontend Architecture

The frontend follows a modular structure inspired by scalable frontend architecture principles.

```txt
src/
├── app/
├── entities/
│   ├── property/
│   └── user/
├── shared/
│   ├── components/
│   └── ui/
```

Separation of concerns:

- API logic
- UI components
- reusable shared components
- feature-specific modules
- type-safe architecture

---

## 📦 Image Upload Pipeline

Images are processed using a production-ready upload flow:

```txt
Client
→ FormData
→ Express
→ Multer (memory storage)
→ Streamifier
→ Cloudinary
→ MongoDB
→ Client
```

### Why Cloudinary?

Images are:

- not stored locally
- optimized for performance
- served through CDN
- scalable for production

The database stores only image URLs.

---

## 🔒 Security & Validation

Implemented security and validation features:

- JWT authentication
- Protected routes
- Ownership authorization
- Role-based access control
- Zod schema validation
- Global error handling middleware

---

## 📄 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Properties

```http
GET    /api/properties
GET    /api/properties/:id
GET    /api/properties/my

POST   /api/properties
PATCH  /api/properties/:id
DELETE /api/properties/:id
```

### Users

```http
POST   /api/users/favorites
GET    /api/users/me
```

---

## 🔐 Authentication Flow

```txt
User logs in
→ JWT token issued
→ Token stored on client
→ Authorization header attached
→ Backend verifies token
→ Access granted to protected resources
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### Clone repository

```bash
git clone https://github.com/RomanFrontEndDeveloper/roman-real-estate.git
cd roman-real-estate
```

### Install dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd server
npm install
```

### Run development server

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

---

## 💡 Key Highlights

✅ Fullstack Architecture  
✅ Authentication & Authorization  
✅ Role-Based Access Control  
✅ Ownership Permissions  
✅ REST API  
✅ Cloud Image Upload  
✅ Pagination & Filtering  
✅ Debounced Search  
✅ Favorites System  
✅ Skeleton Loading  
✅ Type-Safe Development (TypeScript)  
✅ Zod Validation  
✅ Global Error Handling  
✅ React Query Data Fetching  
✅ Production Deployment

---

## 🎯 Project Goal

This project demonstrates real-world development skills required for a:

**Junior / Strong Junior / Middle Frontend Developer**

with backend integration experience and production-oriented architecture.

---

## 📧 Contact

**Roman Okhremov**  
Frontend / Fullstack Developer

📩 Email: romariotraveler@gmail.com  
💬 Telegram: @T168234
