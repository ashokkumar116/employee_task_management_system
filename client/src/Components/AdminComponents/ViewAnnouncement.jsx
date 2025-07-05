import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { ArrowLeftCircle, Megaphone } from "lucide-react";

const ViewAnnouncement = () => {
  const [announcement, setAnnouncement] = useState({});
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const response = await axios.get("/auth/employees");
    setEmployees(response.data);
  };

  const fetchAnnouncement = async () => {
    const response = await axios.get(
      `/announcements/viewannouncement/${id}`
    );
    setAnnouncement(response.data);
  };

  useEffect(() => {
    fetchAnnouncement();
    fetchEmployees();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const creator = employees.find((emp) => emp.id === announcement.sent_by)?.name;

  return (
    <div className="px-6 py-8 pl-56 pr-6 min-h-screen bg-gray-950 text-white">
      <button
        className="mb-6 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Megaphone className="text-yellow-400" />
          <h1 className="text-2xl font-semibold tracking-wide">
            {announcement.title}
          </h1>
        </div>

        <div
          className="prose prose-invert max-w-none text-gray-300 mb-6 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: announcement.message }}
        />

        <div className="flex flex-col gap-1 text-gray-400 text-sm border-t border-gray-800 pt-4">
          <p>
            <span className="text-white font-medium">Created by:</span>{" "}
            {creator || "Loading..."}
          </p>
          <p>
            <span className="text-white font-medium">Date:</span>{" "}
            {announcement.created_at ? formatDateTime(announcement.created_at) : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewAnnouncement;
