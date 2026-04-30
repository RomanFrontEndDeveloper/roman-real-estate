# RomanRealEstate 🏡

Fullstack real estate platform with modern UI, authentication, and property management.

---

## 🚀 Overview

RomanRealEstate is a fullstack web application for managing real estate listings.
Users can register, log in, create properties with images, and manage their listings.

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack Query

### Backend

- Express.js
- Mongoose
- jsonwebtoken
- multer
- MongoDB

---

## ⚙️ Features

### 🔐 Authentication

- Register & Login
- JWT-based authentication
- Protected routes

### 🏠 Properties

- Create property with images
- View all properties
- View single property page
- Delete property
- Edit property (in progress)

### ❤️ User Features

- Add/remove favorites
- Get current user data

### 🎨 UI/UX

- Responsive design
- Modern card layout
- Image gallery
- Toast notifications

---

## 📁 Project Structure

```
client/
  app/
  entities/
  shared/

server/
  controllers/
  routes/
  models/
  middleware/
  services/
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

## 🌐 API Endpoints (examples)

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/properties
GET    /api/properties/:id
GET    /api/properties/my

POST   /api/properties
DELETE /api/properties/:id

POST   /api/users/favorites
GET    /api/users/me
```

---

## 🔐 Authentication Flow

1. User logs in → receives JWT token
2. Token stored in localStorage
3. Token sent via Authorization header
4. Backend verifies token (middleware)
5. Access to protected routes

---

## 📦 File Upload

- Images are uploaded using multipart/form-data
- Stored on server (`/uploads`)
- Served as static files

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: Render / Railway / VPS

---

## 📌 Project Goal

This project is built to grow from **Junior → Middle → Fullstack Developer**,
focusing on real-world architecture, authentication, and data flow.

---

## 📧 Contact

Roman Okhremov
romariotraveler@gmail.com
@T168234
Frontend / Fullstack Developer (in progress)
