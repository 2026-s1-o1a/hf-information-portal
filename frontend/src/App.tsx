import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import SignUpPage from './pages/auth/signup/SignUpPage'
import Search from './pages/search/Search'
import SignInPage from './pages/auth/signin/SignInPage'

import './Theme.css'

import { Route, Navigate, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

// export type User = {
//   email: string
//   username: string
//   password: string // DB: remove later
//   role: 'user' | 'doctor' | 'custodian' | 'admin'
// }

function App() {

  const [user, setUser] = useState(null);

  const loadUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        withCredentials: true, // Ensure cookies are sent along with the request
      });

      setUser(response.data);

    } catch (error) {
      console.error('Error fetching user', error);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <div>

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage loadUserProfile={loadUserProfile} />} />
        <Route path="/signin" element={<SignInPage loadUserProfile={loadUserProfile} />} />

        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
