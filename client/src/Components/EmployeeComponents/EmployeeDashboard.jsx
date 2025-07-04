import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "../../axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const [myTasks, setMyTasks] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notStartedTasks, setNotStartedTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const taskList = Object.values(myTasks);

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
                                        src={`http://localhost:5000${user.profile_pic}`}
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
                            <div className="space-y-4 text-sm text-gray-200">
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
                                <div className="flex flex-col items-center justify-center text-gray-400 py-10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-16 h-16 mb-4 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17v-6a1 1 0 012 0v6m4-6v6a1 1 0 102 0v-6a1 1 0 00-2 0zm-6 0a1 1 0 10-2 0v6a1 1 0 002 0v-6zm3-8a9 9 0 100 18 9 9 0 000-18z"
                                        />
                                    </svg>
                                    <p className="text-sm">
                                        No task data available
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
