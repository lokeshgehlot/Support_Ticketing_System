# 🎫 Support Ticketing System (MERN Stack)

## 📌 Project Description

This is a full-stack web application built using the **MERN stack** (MongoDB, Express, React, Node.js). The application serves as a support ticketing system where:

- **Users** can register, login, and raise support tickets.
- **Admins** can login separately to view and manage tickets with options to update their status.

---

## ⚙️ Step-by-Step Setup

### 📁 1. Clone the Repository

```
git clone https://github.com/lokesh-gehlot/support-ticketing-system.git
cd support-ticketing-system
````

### 🖥️ 2. Backend Setup

```
cd backend
npm install
```

#### 🔐 Create `.env` file in `backend/`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

#### ▶ Start Backend Server

```
npm run server
```

It should run at: `http://localhost:5000/`

### 🌐 3. Frontend Setup

```
cd ../frontend
npm install
```

#### ▶ Start Frontend Server

```
npm start
```

It should run at: `http://localhost:3000/`

---

## ☁️ MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a cluster and user.
3. Whitelist your IP.
4. Get the connection string and replace it in `.env` → `MONGO_URI`.

### Option 2: Local MongoDB

1. Install MongoDB locally from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Start MongoDB server:

```
mongod
```

3. Use: `mongodb://localhost:27017/support-ticket-db` as your `MONGO_URI`.

---

## 🔑 Admin Login Credentials

```
Email: admin@intellipaat.com
Password: admin123
```

---

## 📡 API Documentation

### 🔐 Auth Routes

#### POST `/api/auth/register`

Registers a new user.

**Request Body:**

```json
{
  "name": "Loki",
  "email": "loki@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Registered",
  "token": "...",
  "user": { "id": "...", "name": "Loki", "email": "loki@example.com" }
}
```

---

#### POST `/api/auth/login`

**For regular user login**

```json
{
  "email": "loki@example.com",
  "password": "password123"
}
```

---

#### POST `/api/auth/admin-login`

**For admin login**

```json
{
  "email": "admin@intellipaat.com",
  "password": "admin123"
}
```

---

### 🎟 Ticket Routes

All routes require **Authorization: Bearer `<token>`**

#### POST `/api/tickets/create`

Create a new ticket.

**Request Body:**

```json
{
  "course": "Full Stack",
  "contactNumber": "9999999999",
  "concern": "Need help with assignment"
}
```

---

#### GET `/api/tickets/user`

Get all tickets created by the logged-in user.

---

#### GET `/api/tickets/all`

Admin-only: Get all tickets with status `"Need to Call"`.

---

#### PUT `/api/tickets/:id/status`

Admin-only: Update ticket status.

**Request Body:**

```json
{
  "status": "Closed"
}
```

---

## 🖼 Screenshots

### 👤 User Dashboard

![User Dashboard](support-ticketing-system\Screenshots\User-dashboard.png)

### 🛠 Admin Dashboard

![Admin Dashboard](support-ticketing-system\Screenshots\Admin-dashboard.png)


---

## 🙌 Features

* JWT Authentication
* Protected Routes
* Role-based Access (Admin vs User)
* Persistent Login via localStorage
* Basic styling using CSS
* Modular structure

---

## 🧑‍💻 Tech Stack

* **Frontend:** React.js
* **Backend:** Express.js, Node.js
* **Database:** MongoDB (Atlas or Local)
* **Authentication:** JWT
* **UI:** Plain CSS

---

## 📫 Contact

For any queries or improvements, feel free to open an issue or contact the developer.

