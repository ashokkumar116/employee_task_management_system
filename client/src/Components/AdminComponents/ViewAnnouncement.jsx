import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import React, { useEffect, useState } from "react";

const ViewAnnouncement = () => {
    const [announcement, setAnnouncement] = useState({});
    const [employees, setEmployees] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        const response = await axios.get("/auth/employees");
        setEmployees(response.data);
        console.log(response.data);
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

    useEffect(() => {
        console.log(employees);
    }, [employees]);

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
            timeZone: "Asia/Kolkata",
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
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{announcement.title}</h1>
                <div
                    className="text-sm prose prose-sm max-w-none font-normal"
                    dangerouslySetInnerHTML={{ __html: announcement.message }}
                />
                <p className="text-gray-400 text-sm">
                    Created By{" "}
                    {
                        employees.find((emp) => emp.id === announcement.sent_by)
                            ?.name
                    }
                </p>
                <p className="text-gray-400 text-sm">
                    Created on {formatDateTime(announcement.created_at)}
                </p>
            </div>
        </div>
    );
};

export default ViewAnnouncement;
