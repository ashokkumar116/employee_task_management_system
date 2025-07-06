import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { ArrowLeftCircle } from "lucide-react";
ChartJS.register(ArcElement, Tooltip, Legend);

const ViewEmployee = () => {
    const [employee, setEmployee] = useState({});
    const [tasks, setTasks] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [notStartedTasks, setNotStartedTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const taskList = Object.values(tasks);
    console.log(taskList);

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchEmployee = async () => {
        try {
            const emp = await axios.get(`/auth/employees/${id}`);
            setEmployee(emp.data);
        } catch (error) {
            console.log(error);
        }
    };
    const FetchHisTask = async () => {
        try {
            const res = await axios.get(`/tasks/gethistask/${id}`);
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDatas = () => {
        setCompletedTasks(
            taskList.filter((task) => task.status === "Completed")
        );
        setInProgressTasks(
            taskList.filter((task) => task.status === "In Progress")
        );
        setNotStartedTasks(
            taskList.filter((task) => task.status === "Not Started")
        );
    };

    useEffect(() => {
        fetchEmployee();
        FetchHisTask();
    }, []);

    useEffect(() => {
        fetchDatas();
    }, [tasks]);

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
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const truncateText = (text, maxLength = 30) => {
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    };

    const getSeverity = (status) => {
        switch (status) {
            case "Not Started":
                return "danger";

            case "In Progress":
                return "warning";

            case "Completed":
                return "success";

            case "High":
                return "danger";

            case "Low":
                return "success";

            case "Medium":
                return "warning";
        }
    };

    const getIcon = (status) => {
        switch (status) {
            case "Not Started":
                return "pi pi-ban";

            case "In Progress":
                return "pi pi-clock";

            case "Completed":
                return "pi pi-check-circle";
            case "High":
                return "pi pi-angle-double-up";

            case "Low":
                return "pi pi-angle-double-down";

            case "Medium":
                return "pi pi-angle-double-right";
        }
    };

    const dateTemplate = (rowData) => {
        return <span>{formatDate(rowData.deadline)}</span>;
    };

    const actionbody = (rowData) => {
        return (
            <div className="flex gap-2">
                <Link to={`/viewtask/${rowData.id}`}>
                    <button className="btn btn-info">View</button>
                </Link>
            </div>
        );
    };

    return (
        <div className="px-4 py-6 pl-56 pr-6 py-6">
            <button
        className="mb-6 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>
            <div className="bg-gray-900 rounded-xl shadow-xl flex gap-5 flex-col p-8">
                <div className="profile flex gap-5 justify-between ">
                    <div className="flex gap-5">
                        <div className="h-110 avatar w-70 ">
                            {employee.profile_pic ? (
                                <img
                                    src={`https://employee-task-management-system-rye4.onrender.com${employee.profile_pic}`}
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
                        <div className="flex flex-col gap-3">
                            <h1 className="text-2xl uppercase font-bold">
                                Name : {employee.name}
                            </h1>
                            <p className="italic text-gray-300">
                                Email : {employee.email}
                            </p>
                            <p className="italic text-gray-300">
                                Role : {employee.role}
                            </p>
                            <p className="italic text-gray-300">
                                Position : {employee.position}
                            </p>
                            <p className="italic text-gray-300">
                                Join Date : {formatDate(employee.join_date)}
                            </p>
                            <p className="italic text-gray-300">
                                Mobile Number : {employee.contact}
                            </p>

                            <div className="bg-gray-800 rounded-md py-5 px-3 mt-3">
                                <h1 className="text-2xl font-bold">
                                    Task Overview
                                </h1>
                                <div className="overview grid grid-cols-4 gap-3 mt-5 w-215 h-27">
                                    <div className="bg-blue-900 p-3 rounded-md flex flex-col justify-center items-center gap-5">
                                        <strong>Total</strong>{" "}
                                        <strong>{taskList.length}</strong>
                                    </div>
                                    <div className="bg-green-600 p-3 rounded-md flex flex-col justify-center items-center gap-5">
                                        <strong>Completed</strong>{" "}
                                        <strong>{completedTasks.length}</strong>
                                    </div>
                                    <div className="bg-yellow-600 p-3 rounded-md flex flex-col justify-center items-center gap-5 ">
                                        <strong>In Progress</strong>{" "}
                                        <strong>
                                            {inProgressTasks.length}
                                        </strong>
                                    </div>
                                    <div className="bg-red-500 p-3 rounded-md flex flex-col justify-center items-center gap-5">
                                        <strong>Not Started</strong>{" "}
                                        <strong>
                                            {notStartedTasks.length}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chart h-45 w-45 absolute right-20">
                        <Pie data={chartData} options={options} />
                    </div>
                </div>
                <DataTable
                    emptyMessage="No Task Assigned to this Employee"
                    header="Assigned Tasks"
                    value={taskList}
                    removableSort
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    stripedRows
                >
                    <Column
                        field="title"
                        header="Title"
                        body={(rowData) => {
                            return <span>{truncateText(rowData.title)}</span>;
                        }}
                    />
                    <Column
                        field="description"
                        header="Description"
                        body={(rowData) => {
                            return (
                                <div
                                    className="text-sm prose prose-sm max-w-none font-normal"
                                    dangerouslySetInnerHTML={{
                                        __html: truncateText(rowData.description),
                                    }}
                                />
                            );
                        }}
                    />
                    <Column
                        field="status"
                        header="Status"
                        body={(row) => (
                            <Tag
                                value={row.status}
                                severity={getSeverity(row.status)}
                                icon={getIcon(row.status)}
                            />
                        )}
                    />

                    <Column
                        field="priority"
                        header="Priority"
                        body={(row) => (
                            <Tag
                                value={row.priority}
                                severity={getSeverity(row.priority)}
                                icon={getIcon(row.priority)}
                            />
                        )}
                    />
                    <Column
                        sortable
                        field="deadline"
                        header="Deadline"
                        body={dateTemplate}
                    />
                    <Column header="Action" body={actionbody} />
                </DataTable>
            </div>
        </div>
    );
};

export default ViewEmployee;
