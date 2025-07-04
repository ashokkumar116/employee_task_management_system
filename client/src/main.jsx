import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext'
import Sidebar from './Components/Sidebar'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
   
    <App  />
  </AuthProvider>,
)
