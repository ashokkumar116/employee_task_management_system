const db = require("../db");

const addPosition = async (req, res) => {
  const { position } = req.body;

  if (!position || position.trim() === "") {
    return res.status(400).json({ message: "Position is required" });
  }

  const sql = "INSERT INTO positions (position) VALUES (?)";
  try {
    await db.query(sql, [position]);
    return res.status(200).json({ message: "Position added" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add position", error: err });
  }
};

const getPositions = async (req, res) => {
  try {
    const [positions] = await db.query("SELECT * FROM positions");
    return res.status(200).json(positions);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch positions", error: err });
  }
};

const deletePosition = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM positions WHERE id = ?", [id]);
    return res.status(200).json({ message: "Position deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete position", error: err });
  }
};

module.exports = {
  addPosition,
  getPositions,
  deletePosition,
};
