import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "../axios";

import TasksDoughnutChart from "../Components/AdminComponents/TasksDoughnutChart.jsx";
import EmployeeDoughnutChart from "../Components/AdminComponents/EmployeeChart";

const Home = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const [employeesCount, setEmployeesCount] = useState("");
    const [adminCount, setAdminCount] = useState("");
    const [employeesRoleCount, setEmployeesRoleCount] = useState("");
    const [totalTaskCount, setTotalTaskCount] = useState("");
    const [completedCount, setCompletedCount] = useState("");
    const [progressCount, setProgressCount] = useState("");
    const [notStartedCount, setNotStartedCount] = useState("");

    const fetchEmployeeCount = async () => {
        try {
            const employees = await axios.get("/auth/employees");
            console.log(employees.data);
            setEmployeesCount(employees.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAdminCount = async () => {
        try {
            const admins = await axios.get("/auth/admins");
            console.log(admins.data);
            setAdminCount(admins.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEmpCount = async () => {
        try {
            const emp = await axios.get("/auth/emp");
            console.log(emp.data);
            setEmployeesRoleCount(emp.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTasksCount = async (req, res) => {
        try {
            const tasks = await axios.get("/tasks/getalltasks");
            console.log(tasks.data);
            setTotalTaskCount(tasks.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCompletedCount = async (req, res) => {
        try {
            const completed = await axios.get("/tasks/completed");
            console.log(completed.data);
            setCompletedCount(completed.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchProgressCount = async (req, res) => {
        try {
            const progress = await axios.get("/tasks/progress");
            console.log(progress.data);
            setProgressCount(progress.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchNotStartedCount = async (req, res) => {
        try {
            const notstarted = await axios.get("/tasks/notstarted");
            console.log(notstarted.data);
            setNotStartedCount(notstarted.data.length);
        } catch (error) {
            console.log(error);
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
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className="min-h-screen w-full w=[100%] bg-gray-950 px-4 py-6 pl-56 pr-6 py-6 text-white flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold uppercase text-center">
            Welcome, {user.name.toUpperCase()}
          </h1>
      
          <div className="bg-gray-800 w-full max-w-3xl rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Employees Overview
            </h2>
      
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
              <div className="flex flex-col gap-3 w-full sm:w-[60%]">
                <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-md font-medium">Total</span>
                  <span className="text-xl font-bold">{employeesCount}</span>
                </div>
                <div className="flex gap-4">
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
                <EmployeeDoughnutChart
                  admins={adminCount}
                  employees={employeesCount}
                />
              </div>
            </div>
          </div>
      
          <div className="bg-gray-800 w-full max-w-3xl rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Tasks Overview
            </h2>
      
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
              <div className="flex flex-col gap-3 w-full sm:w-[60%]">
                <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-md font-medium">Total Tasks</span>
                  <span className="text-xl font-bold">{totalTaskCount}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center">
                    <span className="text-sm font-medium">Completed</span>
                    <span className="text-lg font-bold">{completedCount}</span>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center">
                    <span className="text-sm font-medium">In Progress</span>
                    <span className="text-lg font-bold">{progressCount}</span>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center">
                    <span className="text-sm font-medium">Not Started</span>
                    <span className="text-lg font-bold">{notStartedCount}</span>
                  </div>
                </div>
              </div>
      
              <div className="w-full sm:w-[40%]">
                <TasksDoughnutChart
                  completed={completedCount}
                  inProgress={progressCount}
                  notStarted={notStartedCount}
                />
              </div>
            </div>
          </div>
        </div>
      );
};

export default Home;
