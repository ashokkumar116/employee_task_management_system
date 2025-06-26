import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const Sidebar = () => {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="fixed top-0 left-0 h-full w-52 bg-gray-900 p-4 shadow-lg flex flex-col items-center gap-10 z-50">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <img
          src={`http://localhost:5000${user.profile_pic}`}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-gray-600"
        />
        <h2 className="text-white text-lg font-semibold text-center">
          {user.name.toUpperCase()}
        </h2>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-5 w-full items-center text-white font-medium text-sm">
        <Link
          to="/"
          className="hover:bg-gray-800 w-full text-center py-2 rounded-md"
        >
          Dashboard
        </Link>
        <Link
          to="/tasks"
          className="hover:bg-gray-800 w-full text-center py-2 rounded-md"
        >
          Tasks
        </Link>
        <Link
          to="/employees"
          className="hover:bg-gray-800 w-full text-center py-2 rounded-md"
        >
          Employees
        </Link>
        <Link
          to="/announcements"
          className="hover:bg-gray-800 w-full text-center py-2 rounded-md"
        >
          Announcements
        </Link>
        <Link
          to="/settings"
          className="hover:bg-gray-800 w-full text-center py-2 rounded-md"
        >
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
