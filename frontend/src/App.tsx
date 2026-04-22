import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import SignUpPage from './pages/auth/signup/SignUpPage'
import Search from './pages/search/Search'
import SignInPage from './pages/auth/signin/SignInPage'

import './Theme.css'

import { Route, Navigate, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'

export type User = {
  email: string
  username: string
  password: string // DB: remove later
  role: 'user' | 'doctor' | 'custodian' | 'admin'
}

function App() {
  const [user, setUser] = useState<User | null>(() => {
    // DB REPLACE
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
        <Route path="/register" element={<SignUpPage setUser={setUser} />} />
        <Route path="/login" element={<SignInPage setUser={setUser} />} />

        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
