import axios from "../../axios";
import { Tag } from "primereact/tag";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { CheckCircle2 } from "lucide-react"; // Optional icon for header
import { Link } from "react-router-dom";

const CompletedTasks = () => {
  const { loading } = useContext(AuthContext);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [assignedNames, setAssignedNames] = useState({});
  const [message, setMessage] = useState(null);
  const toast = useRef(null);

  const fetchAssignedTasks = async () => {
    try {
      const response = await axios.get("/tasks/completedtasks");
      setCompletedTasks(response.data);
      setMessage(null);
    } catch (error) {
      setMessage("No Completed Tasks Available for you");
    }
  };

  const fetchUserMaps = async () => {
    try {
      const res = await axios.get("/auth/employees");
      const nameMap = {};
      res.data.forEach((emp) => {
        nameMap[emp.id] = emp.name;
      });
      setAssignedNames(nameMap);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
    fetchUserMaps();
  }, []);

  const statusDropdown = [
    { label: "Not Started", value: "Not Started" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const handleStatusChange = async (e, taskId) => {
    try {
      const newStatus = e.value;
      await axios.put(`/tasks/task/updatestatus/${taskId}`, {
        status: newStatus,
      });
      fetchAssignedTasks();
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Task status updated",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update status",
        life: 3000,
      });
    }
  };

  const getSeverity = (status) => {
    switch (status) {
      case "Not Started": return "danger";
      case "In Progress": return "warning";
      case "Completed": return "success";
      default: return null;
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "Not Started": return "pi pi-ban";
      case "In Progress": return "pi pi-clock";
      case "Completed": return "pi pi-check-circle";
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength = 100) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="px-6 py-8 pl-56 pr-6 min-h-screen bg-gray-950 text-white">
      <Toast ref={toast} />
      <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
        <CheckCircle2 className="text-green-400 w-6 h-6" />
        <h2 className="text-2xl font-semibold tracking-wide">Completed Tasks</h2>
      </div>

      {message && (
        <div className="bg-red-600 text-white px-4 py-3 rounded mb-5">
          {message}
        </div>
      )}

      {completedTasks.map((task) => (
        <Link to={`/viewtask/${task.id}`}>
        
        <div
          key={task.id}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 hover:border-green-500 transition duration-300 shadow-sm"
        >   
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <span className="text-sm text-gray-400">
              Deadline : {formatDate(task.deadline)}
            </span>
          </div>

          <p
            className="text-gray-300 mb-4 leading-relaxed text-sm prose prose-sm max-w-none font-normal"
            dangerouslySetInnerHTML={{
              __html: truncateText(task.description),
            }}
          />

          <div className="flex flex-wrap items-center gap-5 mb-4">
            <p className="text-sm text-gray-400">
              <span className="text-white font-medium">Assigned by:</span>{" "}
              {assignedNames[task.created_by]}
            </p>

            <div className="flex items-center gap-2">
              <Tag
                value={task.priority}
                severity={getSeverity(task.priority)}
                icon={getIcon(task.priority)}
              />
              <span className="text-gray-400 text-sm">Priority</span>
            </div>

            <div className="flex items-center gap-2">
              <Tag
                value={task.status}
                severity={getSeverity(task.status)}
                icon={getIcon(task.status)}
              />
              <span className="text-gray-400 text-sm">Status</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <label className="text-sm text-gray-300 font-medium">
              Change Status:
            </label>
            <Dropdown
              value={task.status}
              options={statusDropdown}
              onChange={(e) => handleStatusChange(e, task.id)}
              className="w-64"
              placeholder="Select Status"
              panelClassName="text-black"
            />
          </div>
        </div>

        </Link>
      ))}
    </div>
  );
};

export default CompletedTasks;
