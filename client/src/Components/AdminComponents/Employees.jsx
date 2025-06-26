import { AuthContext } from "../../Contexts/AuthContext";
import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    const { loading } = useContext(AuthContext);

    const fetchEmployees = async () => {
        try {
            const employeeslist = await axios.get("/auth/employees");
            setEmployees(employeeslist.data);
            console.log(employeeslist.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) {
        return <div>loading....</div>;
    }

    return (
        <div className="ml-50">
            <h1>Employees List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Profile Pic</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Position</th>
                        <th>Join Date</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => {
                        return (    
                            <tr key={employee.id}>
                                <td>
                                    <img className="h-10"
                                        src={employee.profile_pic ? `http://localhost:5000${employee.profile_pic}` : "http://localhost:5000/uploads/default.webp"}
                                        alt="profile"
                                    />
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                                <td>{employee.position}</td>
                                <td>{employee.join_date}</td>
                                <td>{employee.contact}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
