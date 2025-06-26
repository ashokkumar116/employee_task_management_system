import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "../axios";

const Home = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const [employeesCount,setEmployeesCount] = useState("");

    const fetchEmployeeCount = async()=>{
        try {
            const employees =await axios.get('/auth/employees');
            console.log(employees.data);
            setEmployeesCount(employees.data.length);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchEmployeeCount();
    },[])

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className="flex flex-col h-[100vh] justify-center items-center gap-6 ml-50">

            <p className="text-3xl"> Welcome {user.name}</p>

            <div className="card-for-total-employee p-5 flex flex-col justify-center items-center gap-4 bg-gray-700 rounded-md">
                <p>Total Employees</p>
                <p>{employeesCount}</p>
            </div>

            <button className="btn btn-error" onClick={handleLogout}>logout</button>
        </div>
    );
};

export default Home;
