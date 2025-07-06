import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent';

const AdminProtectedRoutes = ({children}) => {
    
    const {user,loading} = useContext(AuthContext);
    if (loading) return <LoadingComponent/>;

    return user.role === "Admin" ? children : <Navigate to={'/login'} />
}

export default AdminProtectedRoutes
