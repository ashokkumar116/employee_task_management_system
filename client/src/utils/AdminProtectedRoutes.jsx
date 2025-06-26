import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom';

const AdminProtectedRoutes = ({children}) => {
    
    const {user,loading} = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;

    return user.role === "admin" ? children : <Navigate to={'/login'} />
}

export default AdminProtectedRoutes
