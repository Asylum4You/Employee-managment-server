# 🛠️ Employee Management Dashboard – Backend

This is the **backend** of the full-stack role-based employee management system built with **Node.js**, **Express**, **MongoDB**, and **Firebase Admin SDK**. It includes secure JWT authentication, role-based authorization (Admin, HR, Employee), salary/payroll management with Stripe, and fully protected API routes.

---

## 🌐 Live Server

🔗 Live Demo: [View Live Site](https://worksyncemployee.netlify.app/)  <br>
📦 Frontend: [View Frontend Repository](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-layekmia.git)
🔗 API Base URL: `https://employee-management-server-ebon.vercel.app/` <br>

---

## 📌 Features

### 🔐 Secure Authentication

- Firebase ID token verification (Email/Password & Google)
- JWT issuance after login
- Role-based authorization using custom middleware
- Users who are **fired** are automatically **disabled in Firebase** and cannot log in again

### 👥 User Roles & Permissions

| Role     | Capabilities                                                                 |
|----------|-------------------------------------------------------------------------------|
| Admin    | Fire users, update salaries, approve payroll requests                        |
| HR       | Verify employees, submit salary requests, monitor work progress              |
| Employee | Submit work sheets, view their own payment history                           |

---

## 🔑 Authentication Flow

- Firebase login returns a token → Sent to backend
- Backend verifies token → issues **JWT** → Stored in HTTP-only cookie
- All protected routes check for JWT + Role

---

## ⚙️ Technologies Used

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Firebase Admin SDK** – For managing user disable logic
- **jsonwebtoken (JWT)** – Secure session auth
- **Stripe** – For salary payments (Admin only)
- **cookie-parser**, **cors**, **dotenv** – Utility middleware

