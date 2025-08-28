import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import Router from './routes/index.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthContextProvider>
     <Router></Router>
</AuthContextProvider>
  </StrictMode>,
)