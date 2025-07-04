import { useContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Pages/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthContext } from "./Contexts/AuthContext";
import Admindashboard from "./Components/AdminComponents/Admindashboard";
import Sidebar from "./Components/Sidebar";
import AdminProtectedRoutes from "./utils/AdminProtectedRoutes";
import Employees from "./Components/AdminComponents/Employees";
import Tasks from "./Components/AdminComponents/Tasks";
import Announcements from "./Components/AdminComponents/Announcements";
import Settings from "./Components/AdminComponents/Settings";
import ViewTask from "./Components/AdminComponents/ViewTask";
import ViewEmployee from "./Components/AdminComponents/ViewEmployee";
import ViewAnnouncement from "./Components/AdminComponents/ViewAnnouncement";
import EmployeeProtectedRoutes from "./utils/EmployeeProtectedRoutes";
import EmployeeDashboard from "./Components/EmployeeComponents/EmployeeDashboard";

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <BrowserRouter>
                <Sidebar />
                <Routes>
                    <Route
                        path="/login"
                        element={user ? <Navigate to={"/"} /> : <Login />}
                    />
                    <Route
                        path="/"
                        element={
                            user ? (
                                user.role === "Admin" ? (
                                    <AdminProtectedRoutes>
                                        <Home />
                                    </AdminProtectedRoutes>
                                ) : (
                                    <EmployeeProtectedRoutes>
                                        <EmployeeDashboard />
                                    </EmployeeProtectedRoutes>
                                )
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    <Route
                        path="/tasks"
                        element={
                            user ? (
                                <AdminProtectedRoutes>
                                    <Tasks />
                                </AdminProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                            user ? (
                                <AdminProtectedRoutes>
                                    <Employees />
                                </AdminProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/announcements"
                        element={
                            user ? (
                                <AdminProtectedRoutes>
                                    <Announcements />
                                </AdminProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            user ? (
                                <AdminProtectedRoutes>
                                    <Settings />
                                </AdminProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/viewtask/:id"
                        element={
                            user ? (
                                <AdminProtectedRoutes>
                                    <ViewTask />
                                </AdminProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/viewemployee/:id"
                        element={
                            user ? (
                                <AdminProtectedRoutes>
                                    <ViewEmployee />
                                </AdminProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/viewannouncement/:id"
                        element={
                            user ? (
                                <AdminProtectedRoutes>
                                    <ViewAnnouncement />
                                </AdminProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/nk"
                        element={
                            user ? (
                                <EmployeeProtectedRoutes>
                                    <EmployeeDashboard />
                                </EmployeeProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
