
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

![TaskPilot](https://github.com/user-attachments/assets/d7091417-91ad-4919-96d0-9ac7db3242e4)



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
