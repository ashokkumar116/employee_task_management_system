import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Swal from "sweetalert2";
import axios from "../../axios";
import { BadgeCheck } from "lucide-react";

const Positions = () => {
  const [position, setPosition] = useState("");
  const [positions, setPositions] = useState([]);

  const fetchPositions = async () => {
    try {
      const res = await axios.get("/positions/getpositions");
      setPositions(res.data);
    } catch (err) {
      console.error("Error fetching positions", err);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleSubmit = async () => {
    if (!position.trim()) {
      Swal.fire("Warning", "Position name cannot be empty", "warning");
      return;
    }

    try {
      await axios.post("/positions/addposition", { position });
      Swal.fire("Success", "Position added successfully", "success");
      setPosition("");
      fetchPositions();
    } catch (err) {
      console.error("Error adding position", err);
      Swal.fire("Error", "Failed to add position", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the position permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/positions/deleteposition/${id}`);
        Swal.fire("Deleted!", "Position deleted successfully", "success");
        fetchPositions();
      } catch (err) {
        Swal.fire("Error", "Failed to delete position", "error");
      }
    }
  };

  const actionTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      className="p-button-sm p-button-danger"
      onClick={() => handleDelete(rowData.id)}
    />
  );

  return (
    <div className="px-6 py-8 pl-56 pr-6 min-h-screen bg-gray-950 text-white">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-700 pb-3">
        <BadgeCheck className="text-green-400" />
        <h2 className="text-2xl font-bold tracking-wide">Manage Positions</h2>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Position</h3>
        <div className="flex items-center gap-4">
          <InputText
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Enter position name"
            className="w-64"
          />
          <Button label="Add Position" icon="pi pi-plus" onClick={handleSubmit} />
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Available Positions</h3>
        <DataTable
          value={positions}
          stripedRows
          paginator
          rows={5}
          emptyMessage="No positions found"
        >
          <Column field="id" header="ID" style={{ width: "100px" }} />
          <Column field="position" header="Position Name" />
          <Column header="Actions" body={actionTemplate} style={{ width: "120px" }} />
        </DataTable>
      </div>
    </div>
  );
};

export default Positions;
