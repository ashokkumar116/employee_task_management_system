import { Tag } from "primereact/tag";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import Swal from "sweetalert2";
import { Avatar } from "primereact/avatar";

const ViewTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [assignedNames, setAssignedNames] = useState([]);
    const [createdNames, setCreatedNames] = useState([]);
    const navigate = useNavigate();
    const [update_text, setUpdate_Task] = useState("");
    const [taskupdates, setTaskUpdates] = useState([]);
    const [profileImages, setProfileImages] = useState({});

    const getTask = async () => {
        const res = await axios.get(`/tasks/task/${id}`);
        setTask(res.data);
    };

    useEffect(() => {
        getTask();
        fetchUserMaps();
        getUpdates();
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
            const profileImageMap = {};

            res.data.forEach((emp) => {
                nameMap[emp.id] = emp.name;
                profileImageMap[emp.id] = emp.profile_pic; // assuming the key is profile_image
            });

            setAssignedNames(nameMap);
            setCreatedNames(nameMap);
            setProfileImages(profileImageMap); // add this state to store images
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

    const getUpdates = async () => {
        const response = await axios.get(`/taskupdates/gettaskupdate/${id}`);
        setTaskUpdates(response.data);
        console.log(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`/taskupdates/addupdate/${id}`, {
            update_text,
        });
        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Added!",
                text: "Task Update has been added Successfully",
            });
            setUpdate_Task("");
            getUpdates();
        }
    };

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true, 
          timeZone: "Asia/Kolkata"
        });
      }

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
                <p className="font-bold">
                    Priority :{" "}
                    <Tag
                        value={task.priority}
                        severity={getSeverity(task.priority)}
                        icon={getIcon(task.priority)}
                    />
                </p>
                <p>
                    <strong>Deadline :</strong> {formatDate(task.deadline)}
                </p>
                <p>
                    {" "}
                    <strong>Created By : </strong>
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
            <div className="updates mt-5">
                <h1 className="text-2xl mb-3 font-bold">Task Updates</h1>
                <div className="editor flex gap-6 items-end">
                    <Editor
                        placeholder="Add Update"
                        color="white"
                        className="text-black bg-gray-300"
                        value={update_text}
                        onTextChange={(e) => setUpdate_Task(e.htmlValue)}
                    />
                    <button className="btn btn-success" onClick={handleSubmit}>
                        Add Update
                    </button>
                </div>
            </div>
            <div className="updatescom flex flex-col gap-5 mt-5">
                <h1 className="text-xl font-bold">Updates</h1>
                {[...taskupdates].reverse().map((task) => {
                    return (
                        <div
                            key={task.id}
                            className="bg-gray-900 rounded-md p-5 flex flex-col gap-3"
                        >
                            <div className="user flex items-center gap-2">
                                {profileImages[task.user_id] ? (
                                    <Avatar
                                        image={`http://localhost:5000${profileImages[task.user_id]}`}
                                        shape="circle"
                                    />
                                ) : (
                                    <Avatar
                                        label={createdNames[task.user_id]?.[0]}
                                        shape="circle"
                                    />
                                )}

                                <h1>{createdNames[task.user_id]}</h1>
                            </div>
                            <div
                                className="text-sm prose prose-sm max-w-none font-normal editor-content px-10"
                                dangerouslySetInnerHTML={{
                                    __html: task.update_text,
                                }}
                            />
                            <p className="text-[13px] text-gray-400 text-left px-10 py-5">Updated on {formatDateTime(task.created_at)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewTask;


