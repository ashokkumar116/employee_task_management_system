
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
        secure:false,
        sameSite:"strict",
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




module.exports = {addEmployee,login,getAllEmployees,logout,getSpecificUser,editUser,deleteUser,getMe,updateProfilePic ,getAdmins,getEmp};