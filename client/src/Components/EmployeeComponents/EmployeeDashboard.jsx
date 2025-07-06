import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "../../axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import LoadingComponent from "../../LoadingComponent";

const EmployeeDashboard = () => {
    const { user,loading } = useContext(AuthContext);
    const [myTasks, setMyTasks] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notStartedTasks, setNotStartedTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const taskList = Object.values(myTasks);

    if(loading){
        return <LoadingComponent/>;
    }

    const fetchMyTasks = async () => {
        try {
            const res = await axios.get("/tasks/getmytasks");
            setMyTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMyTasks();
    }, []);

    useEffect(() => {
        setCompletedTasks(
            taskList.filter((task) => task.status === "Completed")
        );
        setInProgressTasks(
            taskList.filter((task) => task.status === "In Progress")
        );
        setNotStartedTasks(
            taskList.filter((task) => task.status === "Not Started")
        );
    }, [myTasks]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const chartData = {
        labels: ["Completed", "In Progress", "Not Started"],
        datasets: [
            {
                data: [
                    completedTasks.length,
                    inProgressTasks.length,
                    notStartedTasks.length,
                ],
                backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
                borderColor: "#1f2937",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    color: "white",
                },
            },
        },
    };

    return (
        <div className="px-6 py-8 pl-56 min-h-screen bg-gray-950 text-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <h1 className="text-3xl font-bold uppercase tracking-wide">
                    Welcome, {user.name}
                </h1>

                <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
                            Profile
                        </h2>
                        <div className="profiles flex gap-4">
                            <div className="h-110 avatar w-70 ">
                                {user.profile_pic ? (
                                    <img
                                        src={`https://employee-task-management-system-rye4.onrender.com${user.profile_pic}`}
                                        className="rounded-md"
                                    />
                                ) : (
                                    <div className="avatar avatar-placeholder">
                                        <div className="bg-gray-800 text-neutral-content h-110 w-70 rounded-md flex flex-col gap-4">
                                            <span className="text-xs text-gray-400">
                                                No Profile Pic Added
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4 text-sm text-gray-300 italic ">
                                <p>
                                    <span className="font-semibold">Name:</span>{" "}
                                    {user.name}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {user.email}
                                </p>
                                <p>
                                    <span className="font-semibold">Role:</span>{" "}
                                    {user.role}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Position:
                                    </span>{" "}
                                    {user.position}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Join Date:
                                    </span>{" "}
                                    {formatDate(user.join_date)}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Mobile:
                                    </span>{" "}
                                    {user.contact}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
                            Task Overview
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
                            <div className="bg-blue-800 p-4 rounded-lg">
                                <p className="text-sm">Total</p>
                                <p className="text-xl font-bold">
                                    {taskList.length}
                                </p>
                            </div>
                            <div className="bg-green-600 p-4 rounded-lg">
                                <p className="text-sm">Completed</p>
                                <p className="text-xl font-bold">
                                    {completedTasks.length}
                                </p>
                            </div>
                            <div className="bg-yellow-600 p-4 rounded-lg">
                                <p className="text-sm">In Progress</p>
                                <p className="text-xl font-bold">
                                    {inProgressTasks.length}
                                </p>
                            </div>
                            <div className="bg-red-500 p-4 rounded-lg">
                                <p className="text-sm">Not Started</p>
                                <p className="text-xl font-bold">
                                    {notStartedTasks.length}
                                </p>
                            </div>
                        </div>
                        <div className="w-full max-w-xs mx-auto">
                            {completedTasks.length === 0 &&
                            inProgressTasks.length === 0 &&
                            notStartedTasks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                    <svg
                                        width="220"
                                        height="220"
                                        viewBox="0 0 220 220"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mb-4"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="grad"
                                                x1="0"
                                                y1="0"
                                                x2="1"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#4b5563"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#1f2937"
                                                />
                                            </linearGradient>
                                        </defs>

                                        <rect
                                            x="40"
                                            y="30"
                                            width="140"
                                            height="160"
                                            rx="12"
                                            fill="url(#grad)"
                                        />
                                        <rect
                                            x="50"
                                            y="45"
                                            width="120"
                                            height="20"
                                            rx="4"
                                            fill="#374151"
                                        />
                                        <rect
                                            x="50"
                                            y="75"
                                            width="90"
                                            height="14"
                                            rx="3"
                                            fill="#4b5563"
                                        />
                                        <rect
                                            x="50"
                                            y="100"
                                            width="60"
                                            height="14"
                                            rx="3"
                                            fill="#4b5563"
                                        />
                                        <rect
                                            x="50"
                                            y="125"
                                            width="70"
                                            height="14"
                                            rx="3"
                                            fill="#4b5563"
                                        />

                                        <circle
                                            cx="160"
                                            cy="140"
                                            r="20"
                                            fill="#111827"
                                            stroke="#6b7280"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M160 120 A20 20 0 0 1 180 140 L160 140 Z"
                                            fill="#ef4444"
                                        />
                                        <path
                                            d="M180 140 A20 20 0 1 1 160 120 L160 140 Z"
                                            fill="#eab308"
                                        />

                                        <ellipse
                                            cx="110"
                                            cy="200"
                                            rx="70"
                                            ry="10"
                                            fill="#1f2937"
                                            opacity="0.6"
                                        />
                                    </svg>

                                    <p className="text-base font-medium text-gray-500">
                                        No task data available to visualize
                                    </p>
                                </div>
                            ) : (
                                <Pie data={chartData} options={options} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
