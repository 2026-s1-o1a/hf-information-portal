import type { User } from '../App'
import type { Dispatch, SetStateAction } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import styles from './Navbar.module.css'

import logo from '../assets/logo.png'

type Props = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

function Navbar({ user, setUser }: Props) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/auth/signout',
        {},
        {
          withCredentials: true,
        }
      )

      setUser(null)

      navigate('/')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <nav className={styles.navbar}>
      {/* Left */}
      <div className={styles.navbarLeft}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="HF Portal Logo" className={styles.logo} />

          <span className={styles.title}>CEIH-HF Portal</span>
        </Link>
      </div>

      {/* Center */}
      <div className={styles.navbarCenter}>
        <Link to="/search">Resources</Link>

        {user && <Link to="/surveys">Surveys</Link>}

        {user?.roles?.includes('admin') && <Link to="/admin_panel">Admin Dashboard</Link>}

        {user?.roles?.includes('doctor') && <Link to="/ClinicianOnly">Clinician Dashboard</Link>}
        <a href="https://ceih.sa.gov.au/contact-us" target="_blank" rel="noopener noreferrer">
          Contact CEIH
        </a>
      </div>

      {/* Right */}
      <div className={styles.navbarRight}>
        {user ? (
          <>
            <Link to="/profile" className={styles.hi}>
              Hi, {user.firstName}
            </Link>

            <button className={styles.joinUs} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className={styles.joinUs}>Join Us</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
