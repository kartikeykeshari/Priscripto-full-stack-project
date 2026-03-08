# 🏥 Prescripto – Doctor Appointment Booking System

Prescripto is a **full-stack doctor appointment booking platform** where users can find doctors, book appointments, manage their bookings, and make secure online payments.

The platform also includes an **admin panel** for managing doctors and monitoring appointments.

This project demonstrates **full-stack development skills including React, Node.js, MongoDB, authentication, and payment gateway integration**.

---

# 🚀 Live Features

### 👤 User Features

* User registration and login with **JWT authentication**
* Browse doctors by specialization
* Book appointments with doctors
* View booked appointments
* Cancel appointments
* Secure online payment for appointments
* User profile management

### 🩺 Doctor Features

* Doctor appointment slot management
* View booked appointments
* Manage availability

### 🛠 Admin Features

* Add new doctors
* Manage doctor availability
* View all appointments
* Upload doctor profile images

---

# 🧑‍💻 Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* Bcrypt Password Hashing

### Database

* MongoDB
* Mongoose

### Payment Gateway

* Razorpay

### Media Storage

* Cloudinary

---

# 📂 Project Structure

```
prescripto
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── components
│   ├── context
│   ├── pages
│   └── App.jsx
│
├── admin
│   ├── components
│   ├── pages
│   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/prescripto.git
cd prescripto
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

Run backend server:

```
npm run server
```

Server runs on:

```
http://localhost:4000
```

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 4️⃣ Admin Panel Setup

```
cd admin
npm install
npm run dev
```

Admin panel runs on:

```
http://localhost:5174
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

# 📡 API Endpoints

### User APIs

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| POST   | /api/user/register           | Register new user     |
| POST   | /api/user/login              | Login user            |
| GET    | /api/user/profile            | Get user profile      |
| GET    | /api/user/appointments       | Get user appointments |
| POST   | /api/user/book-appointment   | Book appointment      |
| POST   | /api/user/cancel-appointment | Cancel appointment    |

---

### Admin APIs

| Method | Endpoint              | Description     |
| ------ | --------------------- | --------------- |
| POST   | /api/admin/add-doctor | Add doctor      |
| GET    | /api/admin/doctors    | Get all doctors |
| POST   | /api/admin/login      | Admin login     |

---

# 💳 Payment Flow

1. User books an appointment
2. Backend creates Razorpay order
3. Razorpay checkout opens on frontend
4. Payment is processed securely
5. Backend verifies payment
6. Appointment marked as **Paid**

---

# 🔒 Security Features

* JWT based authentication
* Password hashing using bcrypt
* Secure API endpoints
* Payment verification with Razorpay

---

# 📸 Screenshots

You can add screenshots like:

```
/screenshots/home.png
/screenshots/booking.png
/screenshots/admin.png
```

Example:

```
![Home Page](screenshots/home.png)
```

---

# 🌟 Future Improvements

* Doctor dashboard
* Video consultation
* Email notifications
* Appointment reminders
* Patient reviews and ratings
* AI-based doctor recommendations

---

# 👨‍💻 Author

**Kartikey Keshari**

Full Stack Developer
Skills: React.js | Node.js | MongoDB | Java | C++ | SQL

GitHub: https://github.com/yourusername

---

# ⭐ Support

If you like this project, consider giving it a **star ⭐ on GitHub**.
