import { useContext, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Pages/Home'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { AuthContext } from './Contexts/AuthContext'
import Admindashboard from './Components/AdminComponents/Admindashboard'
import Sidebar from './Components/Sidebar'
import AdminProtectedRoutes from './utils/AdminProtectedRoutes'
import Employees from './Components/AdminComponents/Employees'
import Tasks from './Components/AdminComponents/Tasks'
import Announcements from './Components/AdminComponents/Announcements'
import Settings from './Components/AdminComponents/Settings'

function App() {

  const {user,loading} = useContext(AuthContext);
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <>
      
      <BrowserRouter>
        <Sidebar/>
        <Routes>
          <Route path='/login' element={user ? <Navigate to={'/'}/> : <Login/>} />
          <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
          <Route path='/tasks' element={ user ? <AdminProtectedRoutes><Tasks/></AdminProtectedRoutes> : <Navigate to={'/login'}/>} />
          <Route path='/employees' element={user ? <AdminProtectedRoutes><Employees/></AdminProtectedRoutes>:<Navigate to={'/login'}/>} />
          <Route path='/announcements' element={<AdminProtectedRoutes><Announcements/></AdminProtectedRoutes>} />
          <Route path='/settings' element={<AdminProtectedRoutes><Settings/></AdminProtectedRoutes>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
