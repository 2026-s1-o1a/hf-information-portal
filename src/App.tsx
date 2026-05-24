import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import ContentPage from './pages/ContentPage'
import ContentDetailPage from './pages/ContentDetailPage'

import './Theme.css'

import { Route, Navigate, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'

export type User = {
  email: string
  username: string
  password: string
}

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const location = useLocation()

  const hideNavbarRoutes = ['/login', '/register']

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/content" element={<ContentPage />}/>
        <Route path="/content/:slug" element={<ContentDetailPage />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
