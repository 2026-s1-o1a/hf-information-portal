import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Search from './pages/Search'
import Login from './pages/Login'
import AdminOnly from './pages/AdminOnly'
import ClinicianOnly from './pages/ClinicianOnly'

import './Theme.css'

import { Route, Navigate, Routes, useLocation } from 'react-router-dom'

import { useState } from 'react'

export type User = {
  email: string

  firstName: string
  lastName: string

  password: string

  role: 'patient' | 'clinician' | 'doctor' | 'pharmacy' | 'custodian' | 'admin'

  requestedRole?: 'patient' | 'clinician' | 'doctor' | 'pharmacy' | 'custodian'

  verificationStatus?: 'none' | 'pending' | 'approved' | 'rejected'

  verificationData?: {
    ahpraNumber?: string

    organisation?: string

    workEmail?: string

    pharmacyName?: string
    pharmacyAddress?: string
    licenseNumber?: string

    phoneNumber?: string
  }
}

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser')

    return storedUser ? JSON.parse(storedUser) : null
  })

  const location = useLocation()

  const hideNavbarRoutes = ['/login', '/register']

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />

        <Route path="/search" element={<Search />} />

        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route path="/login" element={<Login setUser={setUser} />} />
        
        <Route path="/AdminOnly" element={
          <ProtectedRoute user={user} allowedRoles={['admin']}>
            <AdminOnly/>
          </ProtectedRoute>
        } />
        <Route path="/ClinicianOnly" element={
          <ProtectedRoute user={user} allowedRoles={['doctor']}>
            <ClinicianOnly/>
          </ProtectedRoute>
        } />

        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
