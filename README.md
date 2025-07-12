# 📦 RentBox – Admin Panel

RentBox Admin Panel is a powerful and elegant admin dashboard for managing products, users, orders, and reviews in a rental platform. Built using **React**, **Tailwind CSS**, and **Node.js**, this panel enables admins to monitor platform activity, user actions, and manage listings efficiently.

---

## 🚀 Features

- 🔐 Admin Authentication (Login / Signup)
- 📊 Dashboard with total counts of:
  - Users
  - Products
  - Orders
- 🧑 View All Users with:
  - Name, Email, Phone, City
  - Role (Admin/User)
  - Product count
  - Review count
  - Order count
- 📦 View All Products with:
  - Owner name
  - Price
  - Order & Review count
- 📅 Recent Activities:
  - User registration
  - Product uploads
  - Order placements
- 🔄 Secure API with Token Authentication
- 🧩 Middleware for Admin Role Validation
- 🌐 Responsive UI with mobile navigation

---

## 🛠️ Tech Stack

**Frontend:**

- React
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Date-fns

---

## 📁 Project Structure

```
RentBox-Admin/
│
├── frontend/ # React admin panel
│ ├── components/ # All UI components
│ ├── App.jsx # Main App
│ └── ...
│
├── backend/ # Node.js API
│ ├── model/ # Mongoose models
│ ├── routes/ # API endpoints
│ ├── middleware/ # JWT & role middleware
│ └── ...
│
└── README.md
```

---

## 📦 Installation

### 🔧 Prerequisites

- Node.js & npm installed
- MongoDB (local or cloud)
- Vite (for frontend dev)

### 🖥️ Backend Setup

---

```bash
cd backend
npm install
# Create .env file with:
# PORT=5000
# MONGO_URI=<your-mongodb-uri>
# secret=<jwt-secret>

npm start
```
