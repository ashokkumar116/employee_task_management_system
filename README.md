
# 🧑‍💼 Employee Task Management System

A full-stack web application that allows administrators to manage employees and assign tasks, while employees can log in, view tasks, and update their status. This project is built with a focus on clean UI, role-based access, and real-world functionality.

## 🔧 Tech Stack

- **Frontend**: React.js, PrimeReact, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, Cookie-based auth
- **File Uploads**: Multer (for profile images)

---

## ✨ Features

### Admin Panel
- Add, edit, delete employees
- Assign tasks to employees
- View all tasks and their statuses
- Manage employee roles and positions

### Employee Panel
- Log in securely
- View assigned tasks
- Update task status (In Progress, Completed)
- View profile info and task history

---

## 🗂️ Folder Structure

```

📦 employee-task-management
├── client (React frontend)
│   ├── src
│   └── ...
├── server (Node + Express backend)
│   ├── controllers
│   ├── routes
│   ├── middlewares
│   └── ...
└── README.md

````

---

## 🔐 Authentication & Authorization

- JWT tokens stored in **HTTP-only cookies**
- Middleware to protect routes
- Role-based access (Admin, Employee)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/employee-task-management.git](https://github.com/ashokkumar116/employee_task_management_system.git
cd employee-task-management
````

### 2. Setup Backend

```bash
cd server
npm install
# Configure .env file (DB credentials, JWT secret)
npm start
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory with:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_db
JWT_SECRET=your_jwt_secret
APP_PASS = your_gmail_pass
```

---

## 🖼️ UI Preview

### 🔐 Admin and Employee Dashboard

<p float="left">
  <img src="https://github.com/user-attachments/assets/7a2e3424-f967-4c73-8609-fff2980da6a7" width="300"/>
    <img src="https://github.com/user-attachments/assets/8571507f-93ea-48a8-bd86-d12d3936dcae" width="300"/>

</p>

### 📋 Employee Management and Employee View

<p float="left">
  <img src="https://github.com/user-attachments/assets/e3f58f44-086a-4cdf-919a-2ad680d3ac0e" width="300"/>
  <img src="https://github.com/user-attachments/assets/d0c9d11d-0cbe-42f9-a514-6084e8bfc0b5" width="300"/>
  <img src="https://github.com/user-attachments/assets/af4fd83e-3357-42c9-a222-83ef85ad0278" width="300"/>
  <img src="https://github.com/user-attachments/assets/f0b2df81-a0d3-4352-a476-65d1e8ea53b5" width="300"/>

</p>

### ✅ Task View and Update

<p float="left">
  <img src="https://github.com/user-attachments/assets/26b37b1d-7c18-4948-9f0c-f7956f683c99" width="300"/>
  <img src="https://github.com/user-attachments/assets/889baecb-d738-4d09-bb9c-98e64f1761fc" width="300"/>

</p>

### 👤 Profile & Final Screens

<p float="left">
  <img src="https://github.com/user-attachments/assets/343f48d5-8e32-482a-9136-9ccaa3d8d45e" width="300"/>
  <img src="https://github.com/user-attachments/assets/8c6b310b-4a71-4b90-90dc-f125ec8b6ed1" width="300"/>
</p>


## 📦 Deployment

* **Frontend**: Netlify
* **Backend**: Render
* **Database**: Clever Cloud

---

## 🤝 Contributing

Feel free to fork the project and open pull requests!

---

## 🌐 Live Demo

🔗 [View Live Demo Here](https://taskpilot-by-ashok-kumar-p.netlify.app)

> ✅ Admin Login:  
> **Email**: testadmin@ashok.com
> **Password**: 12345

> ✅ Employee Login:  
> **Email**: testemployee@ashok.com  
> **Password**: 54321

> (Demo accounts are pre-populated for testing the app features.)

---


## 👨‍💻 Developed by

Ashok Kumar – [@ashokkumar116]([https://github.com/yourusername](https://github.com/ashokkumar116))

```
