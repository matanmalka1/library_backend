# 📚 Library Management Backend API

A RESTful backend API built with **Node.js**, **Express**, **Sequelize ORM**, and **SQLite**.  
It supports **JWT authentication**, **password hashing**, **file uploads**, and full **CRUD operations** for customers, books, authors, and loans.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- SQLite3
- JWT (Authentication)
- bcrypt (Password hashing)
- Multer (File uploads)
- dotenv (Environment variables)
- CORS
- Nodemon
- ES6 Modules

---

## 📁 Project Structure

backend/
│
├── .env
├── server.js
├── db.js
├── package.json
├── package-lock.json
├── .gitignore
├── readme.md
│
├── models/
│ ├── Customer.js
│ ├── Book.js
│ ├── Author.js
│ ├── Loans.js
│ └── associations.js
│
├── routes/
│ ├── customer.js
│ ├── book.js
│ ├── author.js
│ └── loans.js
│
├── helpers/
│ ├── authMiddleware.js
│ ├── multer.js
│ └── validation.js
│
├── public/
│ └── uploads/

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:
PORT=5000
JWT_SECRET=yourSecretKey
JWT_SECRET is required at startup.

---

## 📦 Installation

```bash
npm install

▶️ Run the Server

Development mode:
npm run dev
Production:
npm start
server runs at:
http://localhost:5000
```

---

🔐 Authentication

JWT-based authentication is used for protected routes.

Register
POST /customers/register
Login
POST /customers/login
Response
{
"token": "JWT_TOKEN_HERE"
}
Authorization Header
Authorization: Bearer <TOKEN>

📚 API Endpoints
👤 Customers
Method Endpoint Description
POST /customers/register Register customer
POST /customers/login Login
GET /customers Get all customers
GET /customers/:id Get one
PUT /customers/:id Update
DELETE /customers/:id Delete

✍️ Authors
Method Endpoint Description
POST /authors Create author
GET /authors Get all
PUT /authors/:id Update
DELETE /authors/:id Delete
📖 Books
Method Endpoint Description
POST /books Create book (with image)
GET /books Get all
GET /books/:id Get one
PUT /books/:id Update
DELETE /books/:id Delete

📌 Image Upload

Use multipart/form-data

Field name: image

🔄 Loans
Method Endpoint Description
POST /loans Create loan
GET /loans Get all loans
DELETE /loans/:id Delete loan
🗄️ Database

SQLite database auto-created on server start

Sequelize sync enabled

Relationships:

Customer ↔ Loans

Book ↔ Loans

Author ↔ Books

🛡️ Security

Passwords hashed using bcrypt

JWT token expiration

Protected routes via middleware

.env excluded from GitHub

🧪 Testing

Use Postman or Thunder Client:

Login first

Copy token

Add Authorization header

Test protected routes

📌 Future Improvements

Role-based authorization (Admin/User)

Pagination & filtering

Swagger API documentation

Book availability tracking

Frontend integration

👨‍💻 Author
Matan Yehuda Malka

Git
Matanmalka1

Email:
matan1391@gmail.com

Built for learning and practice using modern backend technologies.
