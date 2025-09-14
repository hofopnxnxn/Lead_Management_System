# 📌 Lead Management System

A **full-stack MERN application** for managing business leads with secure authentication, CRUD operations, server-side pagination, filtering, and sorting. This project was built as part of the **SDE Internship Assignment**.

---

## 🚀 Live Demo

* **Frontend (Vercel):** [https://lead-management-system-five.vercel.app](https://lead-management-system-five.vercel.app)
* **Backend (Render):** [https://lead-management-system-kh2o.onrender.com](https://lead-management-system-kh2o.onrender.com)

---

## 🛠️ Tech Stack

* **Frontend:** React.js, AG Grid, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Deployment:** Vercel (frontend), Render (backend)

---

## 🔐 Authentication

* Secure login/register using **JWT stored in httpOnly cookies**
* Passwords hashed using **bcrypt**
* Unauthorized requests return **401 Unauthorized**

---

## ✨ Features

✅ User authentication (register, login, logout, fetch current user)

✅ Lead CRUD operations (create, read, update, delete)

✅ Server-side pagination

✅ Server-side filtering (by **city** and **status**)

✅ Sorting support (on leads grid)

✅ Responsive UI with **AG Grid**

✅ Fully deployed (frontend + backend + DB)

---

## 📊 Lead Model

Each Lead has the following fields:

```js
{
  id,
  first_name,
  last_name,
  email,       // unique
  phone,
  company,
  city,
  state,
  source,      // [website, facebook_ads, google_ads, referral, events, other]
  status,      // [new, contacted, qualified, lost, won]
  score,       // integer (0-100)
  lead_value,  // number
  last_activity_at,
  is_qualified, // boolean (default: false)
  created_at,
  updated_at
}
```

---

## 📂 API Endpoints

### Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user
* `POST /api/auth/logout` → Logout user
* `GET /api/auth/me` → Fetch current user

### Lead Routes

* `POST /api/leads` → Create new lead
* `GET /api/leads` → Get leads (with pagination, filtering, sorting)
* `GET /api/leads/:id` → Get single lead
* `PUT /api/leads/:id` → Update lead
* `DELETE /api/leads/:id` → Delete lead

---

## 📑 Pagination & Filtering

* **Pagination:**

  * `page` (default: 1)
  * `limit` (default: 20, max: 100)

* **Filters (implemented):**

  * `city` (equals/contains)
  * `status` (enum filter)

* **Sorting:** Supported on AG Grid frontend.

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Amrit3533/Lead_Management_System.git
cd Lead_Management_System
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 👤 Test User Credentials

```
Username: admin
Password: admin
```

---

## 📝 Reflection

The hardest part was fixing **CORS issues** and ensuring frontend + backend worked smoothly with `httpOnly` JWT cookies. I learned how to set up secure authentication, implement server-side pagination/filters, and deploy full-stack apps.

Improvements for future:

* Add advanced filters (number/date ranges).
* Better error handling & form validations.
* Enhanced UI/UX for lead management.

---

## 📧 Contact

Created by **Amrit Singh**

* 📩 Email: [singhamrit3533@gmail.com](mailto:singhamrit3533@gmail.com)
* 🌐 [GitHub Profile](https://github.com/Amrit3533)
