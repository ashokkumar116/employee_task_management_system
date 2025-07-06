import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Megaphone,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronUp,
  LogOut,
  ListChecks,
  CheckCheck,
  ShieldCheck,
  Briefcase
} from "lucide-react";

const Sidebar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const location = useLocation();
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-800 border-l-4 border-blue-500 text-white"
      : "hover:bg-gray-800 text-gray-300";

  return (
    <div className="fixed top-0 left-0 h-full w-52 bg-gray-900 p-4 shadow-lg flex flex-col items-center gap-10 z-50">
      <div className="flex flex-col items-center gap-2 mt-4">
        <img
          src={ 
            user.profile_pic
              ? `http://localhost:5000${user.profile_pic}`
              : "http://localhost:5000/uploads/default.webp"
          }
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-gray-600"
        />
        <h2 className="text-white text-lg font-semibold text-center">
          {user.name.toUpperCase()}
        </h2>
      </div>

      <div className="flex flex-col gap-2 w-full text-sm font-medium">
        <Link
          to="/"
          className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/")}`}
        >
          <LayoutDashboard size={16} /> Dashboard
        </Link>

        {user.role === "Admin" && (
          <>
            <Link
              to="/employees"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/employees")}`}
            >
              <Users size={16} /> Employees
            </Link>
            <Link
              to="/tasks"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/tasks")}`}
            >
              <ClipboardList size={16} /> Tasks
            </Link>
            {/* <Link
              to="/roles"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/roles")}`}
            >
              <ShieldCheck className="w-5 h-5 text-gray-400" /> Roles
            </Link> */}
            <Link
              to="/positions"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/positions")}`}
            >
              <Briefcase className="w-5 h-5 text-gray-400" /> Positions
            </Link>
            <Link
              to="/announcements"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/announcements")}`}
            >
              <Megaphone size={16} /> Announcements
            </Link>
            <Link
              to="/settings"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/settings")}`}
            >
              <SettingsIcon size={16} /> Settings
            </Link>
          </>
        )}

        {user.role === "Employee" && (
          <>
            <button
              onClick={() => setTaskMenuOpen(!taskMenuOpen)}
              className={`w-full text-left py-2 px-4 rounded-md flex justify-between items-center ${taskMenuOpen || location.pathname.includes("/tasks") ? "bg-gray-800 border-l-4 border-blue-500 text-white" : "hover:bg-gray-800 text-gray-300"}`}
            >
              <span className="flex items-center gap-2">
                <ClipboardList size={16} /> Tasks
              </span>
              {taskMenuOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {taskMenuOpen && (
              <div className="pl-6 flex flex-col gap-1">
                <Link
                  to="/my-tasks"
                  className={`py-2 px-2 rounded-md flex items-center gap-2 ${isActive("/my-tasks")}`}
                >
                  <ListChecks size={14} /> Assigned
                </Link>
                <Link
                  to="/completed-tasks"
                  className={`py-2 px-2 rounded-md flex items-center gap-2 ${isActive("/completed-tasks")}`}
                >
                  <CheckCheck size={14} /> Completed
                </Link>
              </div>
            )}

            <Link
              to="/empannouncement"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/empannouncement")}`}
            >
              <Megaphone size={16} /> Announcements
            </Link>
            <Link
              to="/settings"
              className={`w-full text-left py-2 px-4 rounded-md flex items-center gap-2 ${isActive("/settings")}`}
            >
              <SettingsIcon size={16} /> Settings
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-6 flex items-center justify-center gap-2"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
