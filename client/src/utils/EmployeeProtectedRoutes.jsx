import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent';

const EmployeeProtectedRoutes = ({children}) => {

    const {user,loading} = useContext(AuthContext);

    if(loading){
        return <LoadingComponent/>
      }

    return user.role === "Employee" ? children : <Navigate to={'/login'} />
  
}

export default EmployeeProtectedRoutes
