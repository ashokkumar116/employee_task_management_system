import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "../axios";

import TasksDoughnutChart from "../Components/AdminComponents/TasksDoughnutChart.jsx";
import EmployeeDoughnutChart from "../Components/AdminComponents/EmployeeChart";
import PositionChart from "../Components/AdminComponents/PositionChart";

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const [employeesCount, setEmployeesCount] = useState("");
    const [adminCount, setAdminCount] = useState("");
    const [employeesRoleCount, setEmployeesRoleCount] = useState("");
    const [totalTaskCount, setTotalTaskCount] = useState("");
    const [completedCount, setCompletedCount] = useState("");
    const [progressCount, setProgressCount] = useState("");
    const [notStartedCount, setNotStartedCount] = useState("");
    const [positionCounts, setPositionCounts] = useState([]);

    const fetchEmployeeCount = async () => {
        try {
            const res = await axios.get("/auth/employees");
            setEmployeesCount(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchAdminCount = async () => {
        try {
            const res = await axios.get("/auth/admins");
            setAdminCount(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchEmpCount = async () => {
        try {
            const res = await axios.get("/auth/emp");
            setEmployeesRoleCount(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchTasksCount = async () => {
        try {
            const res = await axios.get("/tasks/getalltasks");
            setTotalTaskCount(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCompletedCount = async () => {
        try {
            const res = await axios.get("/tasks/completed");
            setCompletedCount(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchProgressCount = async () => {
        try {
            const res = await axios.get("/tasks/progress");
            setProgressCount(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchNotStartedCount = async () => {
        try {
            const res = await axios.get("/tasks/notstarted");
            setNotStartedCount(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchPositionCounts = async () => {
        try {
            const res = await axios.get("/auth/positions-count");
            setPositionCounts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchEmployeeCount();
        fetchAdminCount();
        fetchEmpCount();
        fetchTasksCount();
        fetchCompletedCount();
        fetchProgressCount();
        fetchNotStartedCount();
        fetchPositionCounts();
    }, []);

    if (loading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen w-full bg-gray-950 px-6 py-6 pl-56 text-white">
            <h1 className="text-3xl font-bold uppercase text-center mb-10">
                Welcome, {user.name.toUpperCase()}
            </h1>

            <div className="flex flex-col lg:flex-row gap-6 w-full mb-6">
                {/* Employees Overview */}
                <div className="bg-gray-800 flex-1 rounded-2xl p-5 shadow-lg min-h-[320px]">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2 flex items-center gap-2">
                        <i className="pi pi-users text-blue-400"></i>
                        Employees Overview
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-col gap-3 w-full sm:w-[60%]">
                            <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                                <span className="text-md font-medium">Total</span>
                                <span className="text-xl font-bold">{employeesCount}</span>
                            </div>
                            <div className="flex gap-3">
                                <div className="bg-gray-900 p-4 w-1/2 rounded-lg flex flex-col items-center">
                                    <span className="text-md font-medium">Admins</span>
                                    <span className="text-xl font-bold">{adminCount}</span>
                                </div>
                                <div className="bg-gray-900 p-4 w-1/2 rounded-lg flex flex-col items-center">
                                    <span className="text-md font-medium">Employees</span>
                                    <span className="text-xl font-bold">{employeesRoleCount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-[40%]">
                            <EmployeeDoughnutChart admins={adminCount} employees={employeesCount} />
                        </div>
                    </div>
                </div>

                {/* Tasks Overview */}
                <div className="bg-gray-800 flex-1 rounded-2xl p-5 shadow-lg min-h-[320px]">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2 flex items-center gap-2">
                        <i className="pi pi-briefcase text-green-400"></i>
                        Tasks Overview
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-col gap-3 w-full sm:w-[60%]">
                            <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                                <span className="text-md font-medium">Total Tasks</span>
                                <span className="text-xl font-bold">{totalTaskCount}</span>
                            </div>
                            <div className="flex gap-3">
                                <div className="bg-gray-900 p-3 w-full rounded-lg flex flex-col items-center">
                                    <span className="text-[13px] font-medium">Completed</span>
                                    <span className="text-lg font-bold">{completedCount}</span>
                                </div>
                                <div className="bg-gray-900 p-3 w-full rounded-lg flex flex-col items-center">
                                    <span className="text-[13px] font-medium">In Progress</span>
                                    <span className="text-lg font-bold">{progressCount}</span>
                                </div>
                                <div className="bg-gray-900 p-3 w-full rounded-lg flex flex-col items-center">
                                    <span className="text-[13px] font-medium">Not Started</span>
                                    <span className="text-lg font-bold">{notStartedCount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-[40%] ml-4">
                            <TasksDoughnutChart
                                completed={completedCount}
                                inProgress={progressCount}
                                notStarted={notStartedCount}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Position Overview */}
            <div className="bg-gray-800 rounded-2xl p-5 shadow-lg min-h-[320px]">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2 flex items-center gap-2">
                    <i className="pi pi-sitemap text-yellow-400"></i>
                    Position Overview
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-col gap-3 w-full sm:w-[60%]">
                        {positionCounts.length === 0 ? (
                            <div className="text-gray-400 text-sm">No positions found.</div>
                        ) : (
                            positionCounts.map((pos, index) => (
                                <div key={index} className="bg-gray-900 p-3 rounded-lg flex justify-between items-center">
                                    <span className="text-md font-medium">{pos.position}</span>
                                    <span className="text-xl font-bold">{pos.count}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="w-full sm:w-[40%] ml-4">
                        <PositionChart data={positionCounts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
