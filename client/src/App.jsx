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
import Settings from "./Pages/Settings";
import ViewTask from "./Components/AdminComponents/ViewTask";
import ViewEmployee from "./Components/AdminComponents/ViewEmployee";
import ViewAnnouncement from "./Components/AdminComponents/ViewAnnouncement";
import EmployeeProtectedRoutes from "./utils/EmployeeProtectedRoutes";
import EmployeeDashboard from "./Components/EmployeeComponents/EmployeeDashboard";
import AssignedTasks from "./Components/EmployeeComponents/AssignedTasks";
import CompletedTasks from "./Components/EmployeeComponents/CompletedTasks";
import EmployeeAnnouncements from "./Components/EmployeeComponents/EmployeeAnnouncements";
import Roles from "./Components/AdminComponents/Roles";
import Positions from "./Components/AdminComponents/Positions";
import PasswordChange from "./Pages/Settings/PasswordChange";
import ForgotPassword from "./Pages/Settings/ForgotPassword";
import OTP from "./Pages/Settings/OTP";
import ResetPassword from "./Pages/Settings/ResetPassword";
import LoadingComponent from "./LoadingComponent";

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingComponent/>;
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
                                <ProtectedRoutes>
                                    <Settings />
                                </ProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/viewtask/:id"
                        element={
                            user ? (
                                <ProtectedRoutes>
                                    <ViewTask />
                                </ProtectedRoutes>
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
                                <ProtectedRoutes>
                                    <ViewAnnouncement />
                                </ProtectedRoutes>
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route path="/my-tasks" element={user ? <EmployeeProtectedRoutes><AssignedTasks/></EmployeeProtectedRoutes> : <Navigate to={'/login'} />} />
                    <Route path="/completed-tasks" element={user ? <EmployeeProtectedRoutes><CompletedTasks/></EmployeeProtectedRoutes> : <Navigate to={'/login'} />} />
                    <Route path="/empannouncement" element={user ? <EmployeeProtectedRoutes><EmployeeAnnouncements/></EmployeeProtectedRoutes> : <Navigate to={'/login'} />} />
                    
                    <Route path="/roles" element={user ? <AdminProtectedRoutes><Roles/></AdminProtectedRoutes> : <Navigate to={'/login'} />} />
                    <Route path="/positions" element={user ? <AdminProtectedRoutes><Positions/></AdminProtectedRoutes> : <Navigate to={'/login'} />} />
                    <Route path="/passwordchange" element={user ? <ProtectedRoutes><PasswordChange/></ProtectedRoutes> : <Navigate to={'/login'} />} />
                    <Route path="/forgotpass" element={user ? <ProtectedRoutes><ForgotPassword/></ProtectedRoutes> : <Navigate to={'/login'} />} />
                    <Route path="/otp" element={user ? <ProtectedRoutes><OTP/></ProtectedRoutes> : <Navigate to={'/login'} />} />
                    <Route path="/resetpass" element={user ? <ProtectedRoutes><ResetPassword/></ProtectedRoutes> : <Navigate to={'/login'} />} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
