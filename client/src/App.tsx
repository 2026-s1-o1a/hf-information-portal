import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Search from './pages/Search'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import ClinicianOnly from './pages/ClinicianOnly'

import './Theme.css'

import { Route, Navigate, Routes, useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react'

import axios from 'axios'

export type User = {
  id: string

  email: string

  firstName?: string
  lastName?: string

  role?: 'patient' | 'clinician' | 'doctor' | 'pharmacy' | 'custodian' | 'admin'

  requestedRole?: 'patient' | 'clinician' | 'doctor' | 'pharmacy' | 'custodian'

  verificationStatus?: 'none' | 'pending' | 'approved' | 'rejected'
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  const location = useLocation()

  const hideNavbarRoutes = ['/login', '/register']

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true,
        })

        setUser(response.data)
      } catch (error) {
        console.error('Failed to load user', error)

        setUser(null)
      }
    }

    loadUser()
  }, [])

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route path="/search" element={<Search />} />

        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route
          path="/admin_panel"
          element={
            <ProtectedRoute user={user} allowedRoles={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ClinicianOnly"
          element={
            <ProtectedRoute user={user} allowedRoles={['doctor']}>
              <ClinicianOnly />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
