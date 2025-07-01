import { Tag } from "primereact/tag";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [assignedNames, setAssignedNames] = useState([]);
    const [createdNames, setCreatedNames] = useState([]);
    const navigate = useNavigate();

    const getTask = async () => {
        const res = await axios.get(`/tasks/task/${id}`);
        setTask(res.data);
    };

    useEffect(() => {
        getTask();
        fetchUserMaps();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
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

    return (
        <div className="px-4 py-6 pl-56 pr-6 py-6">
            <button
                className="btn btn-error mb-5 flex items-center justify-center gap-1"
                onClick={() => navigate(-1)}
            >
                <i className="pi pi-chevron-circle-left"></i>
                <span className="text-error-content">Back</span>
            </button>
            <div className="bg-gray-900 rounded-md shadow-lg flex gap-5 flex-col p-6">
                <h1 className="text-3xl font-bold">{task.title}</h1>
                <div
                
                    className="text-sm prose prose-sm max-w-none font-normal"
                    dangerouslySetInnerHTML={{ __html: task.description }}
                />

                <p className="font-bold">
                    Status :{" "}
                    <Tag
                        value={task.status}
                        severity={getSeverity(task.status)}
                        icon={getIcon(task.status)}
                    />
                </p>
                <p className="font-bold" >Priority : <Tag
                        value={task.priority}
                        severity={getSeverity(task.priority)}
                        icon={getIcon(task.priority)}
                    /></p>
                <p ><strong>Deadline :</strong> {formatDate(task.deadline)}</p>
                <p> <strong>Created By : {" "}</strong>
                    {task.created_by && createdNames[task.created_by]
                        ? createdNames[task.created_by].toUpperCase()
                        : "Loading..."}
                </p>
                <p>
                   <strong>Last Edited By : </strong>
                    {task.last_edited_by && createdNames[task.last_edited_by]
                        ? createdNames[task.last_edited_by].toUpperCase()
                        : "Not edited"}
                </p>
            </div>
        </div>
    );
};

export default ViewTask;
