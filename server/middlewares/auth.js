const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json("Login to Continue");
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_KEY);

        req.user = decoded;
        next();


    } catch (error) {
        return res.status(400).json({message:"Invalid Token"})
    }

}

module.exports = auth;