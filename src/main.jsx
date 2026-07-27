import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { GrievanceProvider } from './context/GrievanceContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GrievanceProvider>
          <App />
        </GrievanceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)