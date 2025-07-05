import { Link } from "react-router-dom";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";

const EmployeeAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    const response = await axios.get("/announcements/getannouncements");
    setAnnouncements(response.data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const truncateText = (text, maxLength = 100) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="px-6 py-8 pl-56 pr-6 min-h-screen bg-gray-950 text-white">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
        <Megaphone className="text-yellow-400 w-6 h-6" />
        <h2 className="text-2xl font-semibold tracking-wide">Announcements</h2>
      </div>

      {announcements.length === 0 && (
        <p className="text-gray-400">No announcements available.</p>
      )}

      <div className="grid grid-cols-1 gap-5">
        {announcements.map((announcement) => (
          <Link to={`/viewannouncement/${announcement.id}`} key={announcement.id}>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-md hover:border-yellow-400 hover:shadow-lg transition cursor-pointer">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-white">{announcement.title}</h3>
                <span className="text-sm text-gray-400">
                  {formatDate(announcement.created_at)}
                </span>
              </div>
              <div
                className="text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: truncateText(announcement.message),
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAnnouncements;
