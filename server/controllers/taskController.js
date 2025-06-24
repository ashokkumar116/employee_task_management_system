const db = require("../db");

const addTask = async (req, res) => {

    const created_by = req.user.id;

    const {title,description,assigned_to,priority,deadline} = req.body;

    if(!title || !description || !assigned_to || !priority || !deadline){
        return res.status(400).json({message:"All Fiels Required"});
    }

    const [assignedUser] = await db.query("SELECT * FROM users WHERE id = ?",[assigned_to]);
    
    if(assignedUser.length === 0){
        return res.status(400).json({message:"User not Found, Can't assign Task"});
    }

    const sql = "INSERT INTO tasks (title,description,assigned_to,created_by,priority,deadline) VALUES (?,?,?,?,?,?)";

    await db.query(sql,[title,description,assigned_to,created_by,priority,deadline]);

    return res.status(200).json({message:`Task Assigned to ${assignedUser[0].name} Successfully`});


};

const getMyTasks =async(req,res)=>{

    const assigned_to = req.user.id;

    const sql = "SELECT * FROM tasks WHERE assigned_to = ?";

    const [tasks] = await db.query(sql,[assigned_to]);

    if(tasks.length === 0){
        return res.json({message:"You don't have any tasks assigned to you"});
    }

    return res.json(tasks);

}

const getAllTasks = async (req,res)=>{

    const sql = "SELECT * FROM tasks"

    const [tasks] = await db.query(sql);

    return res.json(tasks);

}

const viewTask = async (req,res) =>{

    const role = req.user.role;
    const user_id = req.user.id;

    const id = req.params.id;

    if(role === "admin"){

        const [tasks] = await db.query("SELECT * FROM tasks WHERE id = ?",[id]);

        return res.json(tasks[0]);

    }

    else{
        const [tasks] = await db.query("SELECT * FROM tasks WHERE id = ? AND assigned_to = ?",[id,user_id]);
        if(tasks.length === 0){
            return res.json({message:"This task is not assigned to you"});
        }
        return res.json(tasks[0]);
    }
}

const editTask = async (req,res)=>{
    const id = req.params.id;
    const user_id = req.user.id;

    const {title,description,assigned_to,priority,deadline} = req.body;

    const sql = "UPDATE tasks SET title = ? , description = ? , assigned_to = ? , priority = ? , deadline = ? , last_edited_by = ? WHERE id = ?";

    await db.query(sql,[title,description,assigned_to,priority,deadline,user_id,id]);

    return res.status(200).json({message:"Task Updated successfully"});

}

const deleteTask = async (req,res) =>{

    const id = req.params.id;

    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?",[id]);

    if(task.length === 0){
        return res.json({message : "Task not found"});
    }

    await db.query("DELETE FROM tasks WHERE id = ?",[id]);
    return res.status(200).json({message:"Task Deleted Successfully"});

}

module.exports = { addTask ,getMyTasks,getAllTasks ,viewTask,editTask,deleteTask};
