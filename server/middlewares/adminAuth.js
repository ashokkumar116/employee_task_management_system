const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuth = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Please Login to continue"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        console.log(decoded.role);

        if(decoded.role === 'Admin'){
            req.user = decoded;
            console.log(decoded);
            next();
        }
        else{
            return res.status(401).json({message:"You don't have Admin Rights"});
        }

    } catch (error) {
        return res.status(401).json({message:"Invalid Token"});
    }
}

module.exports = adminAuth;