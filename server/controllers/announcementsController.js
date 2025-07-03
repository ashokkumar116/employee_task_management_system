const db = require('../db');


const createAnnouncement = async (req,res) =>{
    
    const id = req.user.id;

    const {title,message} = req.body;

    const sql = "INSERT INTO announcements (title,message,sent_by) VALUES (?,?,?)";

    await db.query(sql,[title,message,id]);

    return res.status(200).json({message:"Announcement Created"});    

}

const getAnnouncements = async (req,res) =>{

    const sql = "SELECT * FROM announcements";

    const [announcements] = await db.query(sql);

    return res.json(announcements);

}

const getOneAnnouncement = async (req,res) =>{
    const id = req.params.id;

    const sql = "SELECT * FROM announcements WHERE id = ?";

    const [announcement] = await db.query(sql,[id]);

    return res.json(announcement[0]);

}

module.exports = {createAnnouncement,getAnnouncements , getOneAnnouncement};