import { Tag } from "primereact/tag";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import Swal from "sweetalert2";
import { Avatar } from "primereact/avatar";
import { ArrowLeftCircle, ClipboardList } from "lucide-react";

const ViewTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [assignedNames, setAssignedNames] = useState([]);
  const [createdNames, setCreatedNames] = useState([]);
  const [update_text, setUpdate_Task] = useState("");
  const [taskupdates, setTaskUpdates] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getTask();
    fetchUserMaps();
    getUpdates();
  }, []);

  const getTask = async () => {
    const res = await axios.get(`/tasks/task/${id}`);
    setTask(res.data);
  };

  const fetchUserMaps = async () => {
    const res = await axios.get("/auth/employees");
    const nameMap = {};
    const imageMap = {};
    res.data.forEach((emp) => {
      nameMap[emp.id] = emp.name;
      imageMap[emp.id] = emp.profile_pic;
    });
    setAssignedNames(nameMap);
    setCreatedNames(nameMap);
    setProfileImages(imageMap);
  };

  const getUpdates = async () => {
    const response = await axios.get(`/taskupdates/gettaskupdate/${id}`);
    setTaskUpdates(response.data);
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
        text: "Task update added successfully",
      });
      setUpdate_Task("");
      getUpdates();
    }
  };

  const getSeverity = (status) => {
    switch (status) {
      case "Not Started": return "danger";
      case "In Progress": return "warning";
      case "Completed": return "success";
      case "High": return "danger";
      case "Low": return "success";
      case "Medium": return "warning";
      default: return null;
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "Not Started": return "pi pi-ban";
      case "In Progress": return "pi pi-clock";
      case "Completed": return "pi pi-check-circle";
      case "High": return "pi pi-angle-double-up";
      case "Low": return "pi pi-angle-double-down";
      case "Medium": return "pi pi-angle-double-right";
      default: return null;
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const formatDateTime = (isoString) =>
    new Date(isoString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

  return (
    <div className="px-6 py-8 pl-56 pr-6 min-h-screen bg-gray-950 text-white">
      <button
        className="mb-6 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-md p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="text-blue-400" />
          <h1 className="text-2xl font-semibold">{task.title}</h1>
        </div>

        <div
          className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />

        <div className="flex flex-wrap gap-4 text-sm">
          <Tag
            value={task.status}
            severity={getSeverity(task.status)}
            icon={getIcon(task.status)}
          />
          <Tag
            value={task.priority}
            severity={getSeverity(task.priority)}
            icon={getIcon(task.priority)}
          />
          <p className="text-gray-400">
            <strong className="text-white">Deadline:</strong> {formatDate(task.deadline)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400 pt-2 border-t border-gray-800 mt-4">
          <p>
            <strong className="text-white">Created by:</strong>{" "}
            {createdNames[task.created_by]?.toUpperCase() || "Loading..."}
          </p>
          <p>
            <strong className="text-white">Last edited by:</strong>{" "}
            {task.last_edited_by ? createdNames[task.last_edited_by]?.toUpperCase() : "Not Edited"}
          </p>
        </div>
      </div>

      {/* Task Update Input */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Add Update</h2>
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <Editor
            value={update_text}
            onTextChange={(e) => setUpdate_Task(e.htmlValue)}
            placeholder="Write your update here..."
            className="w-full bg-white text-black"
          />
          <button
            onClick={handleSubmit}
            className="btn btn-success mt-2 md:mt-0 px-6 py-2 rounded-lg"
          >
            Add Update
          </button>
        </div>
      </div>

      {/* Display Updates */}
      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold">Previous Updates</h2>
        {[...taskupdates].reverse().map((task) => (
          <div
            key={task.id}
            className="bg-gray-900 border border-gray-800 rounded-lg p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
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
              <h3 className="font-semibold">{createdNames[task.user_id]}</h3>
            </div>

            <div
              className="prose prose-invert max-w-none text-sm px-10 text-gray-200"
              dangerouslySetInnerHTML={{ __html: task.update_text }}
            />

            <p className="text-xs text-gray-500 px-10">
              Updated on {formatDateTime(task.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTask;
