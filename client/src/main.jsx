import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext'
import Sidebar from './Components/Sidebar'
import ThemeProvider from './Contexts/ThemeContext'


createRoot(document.getElementById('root')).render(
  <ThemeProvider>

<AuthProvider>
   
   <App  />
 </AuthProvider>

  </ThemeProvider>
)
