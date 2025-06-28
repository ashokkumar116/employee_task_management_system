import axios from "../../axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [assignedNames, setAssignedNames] = useState({});
    const [createdNames, setCreatedNames] = useState({});

    const fetchTasks = async () => {
        const res = await axios.get("/tasks/getalltasks");
        setTasks(res.data);
    };

    const fetchUserMaps = async () => {
        try {
            const res = await axios.get("/auth/employees");
            const nameMap = {};
            res.data.forEach((emp) => {
                nameMap[emp.id] = emp.name;
            });
            setAssignedNames(nameMap);
            setCreatedNames(nameMap);
        } catch (err) {
            console.error("Error fetching employees", err);
        }
    };

    const getSeverity = (status) => {
        switch (status) {
            case "Not Started":
                return "danger";

            case "In Progress":
                return "warning";

            case "Completed":
                return "success";

            case "High":
                return "danger";

            case "Low":
                return "success";

            case "Medium":
                return "warning";
        }
    };

    const getIcon = (status) => {
        switch (status) {
            case "Not Started":
                return "pi pi-ban";

            case "In Progress":
                return "pi pi-clock";

            case "Completed":
                return "pi pi-check-circle";
            case "High":
                return "pi pi-angle-double-up";

            case "Low":
                return "pi pi-angle-double-down";

            case "Medium":
                return "pi pi-angle-double-right";
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchUserMaps();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const dateTemplate = (rowData) => {
        return <span>{formatDate(rowData.deadline)}</span>;
    };

    const asstoBody = (rowData) => {
        return (
            <span>{assignedNames[rowData.assigned_to] || "Loading..."}</span>
        );
    };

    const assbyBody = (rowData) => {
        return <span>{createdNames[rowData.created_by] || "Loading ..."}</span>;
    };

    const statusBody = (rowData) => {
        return (
            <Tag
                icon={getIcon(rowData.status)}
                value={rowData.status}
                severity={getSeverity(rowData.status)}
            />
        );
    };

    const priorityBody = (rowData) => {
        return (
            <Tag
                icon={getIcon(rowData.priority)}
                value={rowData.priority}
                severity={getSeverity(rowData.priority)}
            />
        );
    };

    const actionbody = () =>{
      return <div className="flex gap-2">
        <button className="btn btn-warning" >Edit</button>
        <button className="btn btn-error" >Delete</button>
      </div>
    }

    return (
        <div className="px-4 py-6 pl-56 pr-6 py-6">
            <h1 className="text-2xl font-bold text-center mb-5">Tasks</h1>

            <DataTable
                value={tasks}
                stripedRows
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 15, 20]}
            >
                <Column field="title" header="Title" />
                <Column field="description" header="Description" />
                <Column
                    field="assigned_to"
                    header="Assigned To"
                    body={asstoBody}
                />
                <Column
                    field="created_by"
                    header="Assigned By"
                    body={assbyBody}
                />
                <Column field="status" header="Status" body={statusBody} />
                <Column
                    field="priority"
                    header="Priority"
                    body={priorityBody}
                />
                <Column
                    field="deadline"
                    header="Deadline"
                    body={dateTemplate}
                />
                <Column header="Action" body={actionbody} />
            </DataTable>
        </div>
    );
};

export default Tasks;
