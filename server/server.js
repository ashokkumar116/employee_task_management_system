const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path')

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const announcementsRoutes = require('./routes/announcementsRoutes');
const taskUpdateRoutes = require('./routes/taskUpdateRoutes');
const rolesRoute = require('./routes/rolesRoute');
const positionRoutes = require('./routes/positionRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    origin:"https://taskpilot-by-ashok-kumar-p.netlify.app",
    credentials:true
}))

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/announcements',announcementsRoutes);
app.use('/api/taskupdates',taskUpdateRoutes);
app.use('/api/roles',rolesRoute);
app.use('/api/positions',positionRoutes);




const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running in Port ${PORT}`);
});