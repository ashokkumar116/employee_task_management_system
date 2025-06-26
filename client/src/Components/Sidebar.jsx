import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar flex justify-center items-center w-50 fixed left-0 h-[100vh] z-66 bg-gray-800">
        <div className='flex flex-col gap-7 justify-center items-center' >
            <Link to={'/dashboard'}>Dashboard</Link>
            <Link to={'/tasks'}>Tasks</Link>
            <Link to={'/employees'}>Employees</Link>
            <Link to={'/announcements'}>Announcements</Link>
            <Link to={'/settings'}>Settings</Link>
        </div>
    </div>
  )
}

export default Sidebar
