const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})



db.getConnection().then((Connection)=>{
    console.log("DB Connected")
    Connection.release();
}).catch((err)=>{
    console.log(err);
})


module.exports = db;
