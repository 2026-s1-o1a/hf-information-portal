// import { useState } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Search from './pages/Search'
import Login from './pages/Login'
import './Theme.css'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
     </Routes>
     
     <div className='content-container'>
      <div className='content-header'>
        <h2>Guidelines</h2>
      </div>
      <div className='content-body'>
        <h3>Latest Guidelines</h3>
        <p>Get information on the latest guidelines here.</p>
      </div>
     </div>
    </div>
  )
}

export default App