
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer')

const addEmployee = async (req,res) =>{
    const {name,email,password,role,position,join_date,contact} = req.body;
    console.log(name,email,password,role,position,join_date,contact);

    const profile_pic = req.file?`/uploads/${req.file.filename}`:null;

    if(!name || !email || !password || !role || !position || !join_date || !contact ){
        return res.status(400).json({message:"All Fields are Required"});
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ? OR name = ?",[email,name]);

    if(users.length > 0){
        return res.status(400).json({message:"Username or Email Already Exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
 
    const sql = "INSERT INTO users(name,email,password,role,position,join_date,profile_pic,contact) VALUES (?,?,?,?,?,?,?,?)"

    await db.query(sql,[name,email,hashedPassword,role,position,join_date,profile_pic,contact]);

    return res.status(201).json({message:"User Created Successfully"});

}


const login = async (req,res) =>{

    const {email,password} = req.body;

    const sql = "SELECT * FROM users WHERE email = ? or name = ?";

    const [users] = await db.query(sql,[email,email]);
    const user = users[0];
    if(users.length === 0){
        return res.status(400).json({message:"User Does not Exists"})
    }

    const isPassMatch = await bcrypt.compare(password,user.password);

    if(!isPassMatch){
        return res.status(401).json({message:"Password Wrong"});
    }

    const token = await jwt.sign({id:user.id,role:user.role},process.env.JWT_KEY,{expiresIn:"1d"});

    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"None",
        maxAge:24*60*60*1000
    });

    return res.status(200).json({message:"User Logged In"})

}       


const getAllEmployees = async (req,res)=>{
    const sql = "SELECT * FROM users";
    const [result] = await db.query(sql);
    res.json(result);
}

const getAdmins = async(req,res)=>{
    const sql = "SELECT * FROM users WHERE role = ?";

    const [admins] = await db.query(sql,["Admin"]);
    console.log(admins)
    return res.json(admins);
}

const getEmp = async(req,res)=>{
    const sql = "SELECT * FROM users WHERE role = ?";

    const [emp] = await db.query(sql,["Employee"]);
    console.log(emp)
    return res.json(emp);
}

const getSpecificUser = async(req,res)=>{
    const {id} = req.params;

    const sql = "SELECT * FROM users WHERE id = ?";

    const [user] = await db.query(sql,[id]);

    if(user.length === 0 ){
        return res.status(400).json({message:"User Not found"});
    }   

    return res.json(user[0]);

}

const editUser = async (req,res)=>{
    console.log(req.body);
    const {id} = req.params;
    const {name,email,role,position,contact} = req.body; 
    console.log(name,email,role,position,contact);
    console.log(req.body);

    const profile_pic = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = "UPDATE users SET name = ? , email = ? , role = ? , position = ? , contact = ? , profile_pic = ? WHERE id = ?";

    await db.query(sql,[name,email,role,position,contact,profile_pic,id]);

    return res.status(200).json({message:"User Updated Successfully"});    
    
}

const deleteUser = async (req,res) =>{
    const {id}= req.params;

    const [users] = await db.query("SELECT * FROM users WHERE id = ?",[id]);

    if(users.length === 0){
        return res.json({message:"No user Exists in that name"});
    }

    const sql = "DELETE FROM users WHERE id = ?";

    await db.query(sql,[id]);

    return res.status(200).json({message:"User deleted Successfully"});

}

const getMe = async (req,res)=>{
    const id = req.user.id;

    const sql = "SELECT * FROM users WHERE id = ?";

    const [users] = await db.query(sql,[id]);

    const user = users[0];

    return res.json(user);
    
}

const updateProfilePic = async (req,res)=>{
    
    const id = req.user.id;

    const profile_pic = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = "UPDATE users SET profile_pic = ? WHERE id = ?";

    await db.query(sql,[profile_pic,id]);

    return res.status(200).json({message:"Profile pic Updated"});

}
 
const logout = (req,res) =>{
   res.clearCookie('token');
   return res.json({message:"User Logged Out"});
}


const getPositionCounts = async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT position, COUNT(*) as count 
        FROM users 
        GROUP BY position
      `);
  
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching position counts:", error);
      res.status(500).json({ error: "Failed to fetch position counts" });
    }
  };

  const changePassword = async (req, res) => {
    const id = req.user.id;
    
    const {currentPassword, newPassword } = req.body;
    try {
        
        const sql = "UPDATE users SET password = ? WHERE id = ?";

        const [users] = await db.query("SELECT * FROM users WHERE id = ?",[id]);

        const user = users[0];

        const isMatch = await bcrypt.compare(currentPassword,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Password is wrong"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        await db.query(sql,[hashedPassword,id]);
  
        return res.json({ message: "Password changed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  const sendOtp = async (req,res) =>{

    const id = req.user.id;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE id = ?",[id]);
        if(users.length === 0){
            return res.status(400).json({message:"No users Found"});
        }

        const user = users[0];
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_expire = new Date(Date.now()+5*60*1000);

        await db.query("UPDATE users SET otp = ?,otp_expire =? WHERE email = ?",[otp,otp_expire,user.email]);

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"ashokkumarpandian7@gmail.com",
                pass:process.env.APP_PASS
            }
        });

        await transporter.sendMail({
            from:"ashokkumarpandian7@gmail.com",
            to:user.email,
            subject:"OTP To Reset Password",
            html:`<p>Your OTP To Reset Password is <b>${otp}</b>. This OTP will expire in 5 minutes</p>`
        });

        return res.status(200).json({message:"OTP sent Succesfully"});


    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message}); 
    }
}

const verifyOtp = async(req,res) =>{
    const id = req.user.id;
    const {otp} = req.body;

    const [users] = await db.query("SELECT * FROM users WHERE id = ? AND otp = ? AND otp_expire > NOW()",[id,otp]);
    console.log(users);
    if(users.length === 0){
        return res.status(400).json({message : "Invalid Or Expired OTP"});
    }

    return res.status(200).json({message:"OTP verified"});

}

const passReset = async (req,res) =>{
    const id = req.user.id
    const {newPassword} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        const [employees] = await db.query("SELECT * FROM users WHERE id = ?",[id]); 
        const emp = employees[0];

        await db.query("UPDATE users SET password = ? , otp = NULL , otp_expire = NULL WHERE email = ? ",[hashedPassword,emp.email]);
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"ashokkumarpandian7@gmail.com",
                pass:process.env.APP_PASS
            }
        })

        await transporter.sendMail({
            from:"ashokkumarpandian7@gmail.com",
            to:emp.email,
            subject:"Password Reset Done Successfully",
            html:"<p>Your password has been Reset Successfully </p>"
        })
        return res.status(200).json({message:"Password Reset Done"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error",error:error.message}); 
    }

}



module.exports = {addEmployee,login,getAllEmployees,logout,getSpecificUser,editUser,deleteUser,getMe,updateProfilePic ,getAdmins,getEmp , getPositionCounts , changePassword ,
    sendOtp,
    verifyOtp,
    passReset
};