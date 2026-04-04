// import { useState } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Search from './pages/Search'
// import Search from './pages/Search'
import './Theme.css'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/" replace />} />
     </Routes>
    </div>
  )
}

export default App
