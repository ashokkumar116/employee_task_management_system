import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "../../axios";
import Swal from "sweetalert2";
import { ShieldCheck } from "lucide-react";

const Roles = () => {
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("/roles/getroles");
      setRoles(res.data);
    } catch (err) {
      console.error("Error fetching roles", err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = async () => {
    if (!role.trim()) {
      Swal.fire("Warning", "Role name cannot be empty", "warning");
      return;
    }

    try {
      await axios.post("/roles/addroles", { role });
      Swal.fire("Success", "Role added successfully", "success");
      setRole("");
      fetchRoles();
    } catch (err) {
      console.error("Error adding role", err);
      Swal.fire("Error", "Failed to add role", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/roles/deleterole/${id}`);
        Swal.fire("Deleted!", "Role has been deleted.", "success");
        fetchRoles();
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire("Error", "Failed to delete role", "error");
      }
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-sm p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    );
  };

  return (
    <div className="px-6 py-8 pl-56 pr-6 min-h-screen bg-gray-950 text-white">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-700 pb-3">
        <ShieldCheck className="text-blue-400" />
        <h2 className="text-2xl font-bold tracking-wide">Manage Roles</h2>
      </div>

      {/* Add Role Form */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Role</h3>
        <div className="flex items-center gap-4">
          <InputText
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role name"
            className="w-64"
          />
          <Button label="Add Role" icon="pi pi-plus" onClick={handleSubmit} />
        </div>
      </div>

      {/* Show Roles Table */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Available Roles</h3>
        <DataTable
          value={roles}
          stripedRows
          paginator
          rows={5}
          emptyMessage="No roles found"
        >
          <Column field="id" header="ID" style={{ width: "100px" }} />
          <Column field="role" header="Role Name" />
          <Column header="Actions" body={actionTemplate} style={{ width: "120px" }} />
        </DataTable>
      </div>
    </div>
  );
};

export default Roles;
