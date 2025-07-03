const db = require('../db');

const addUpdate = async(req,res) =>{
    const user_id = req.user.id;
    const task_id = req.params.id;
    const {update_text} = req.body;
    const sql = "INSERT INTO task_updates (task_id,user_id,update_text) VALUES (?,?,?)";

    await db.query(sql,[task_id,user_id,update_text]);

    res.status(200).json({message:"Task Update added"});

}


const getUpdates = async (req,res) =>{
    const task_id = req.params.id;
    const sql = "SELECT * FROM task_updates WHERE task_id = ?";

    const [task_update] = await db.query(sql,[task_id]);

    res.json(task_update);

}


module.exports = {addUpdate,getUpdates};