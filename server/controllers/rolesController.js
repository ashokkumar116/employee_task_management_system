const db = require("../db");

const addRole = async (req, res) => {
    const { role } = req.body;
    const sql = "INSERT INTO roles (role) VALUES (?)";

    await db.query(sql, [role]);
    res.status(200).json({ message: "Role Added" });
};

const getRoles = async(req,res) =>{
    const sql = "SELECT * FROM roles";
    const [roles] = await db.query(sql);

    return res.json(roles);
}

const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
      const sql = "DELETE FROM roles WHERE id = ?";
      await db.query(sql, [id]);
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (err) {
      console.error("Delete role error:", err);
      res.status(500).json({ message: "Failed to delete role" });
    }
  };

module.exports = {addRole , getRoles , deleteRole}