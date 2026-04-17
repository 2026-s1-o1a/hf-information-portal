// import { Link } from 'react-router-dom'
import type { User } from '../App'
import type { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Navbar.module.css'
import logo from '../assets/logo.png'
import { FiMenu, FiSearch } from 'react-icons/fi'

type Props = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

function Navbar({ user, setUser }: Props) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="logo" className={styles.logo} />
          <span className={styles.title}>HF Portal</span>
        </Link>
      </div>

      <div className={styles.navbarCenter}>
        <a
          href="https://ceih.sa.gov.au/clinical-networks"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clinical Networks
        </a>
        <a href="https://ceih.sa.gov.au/news-and-events" target="_blank" rel="noopener noreferrer">
          News and Events
        </a>
        <div className={styles.searchBar}>
          {' '}
          <FiMenu className={styles.icon} />{' '}
          <input type="text" placeholder="Search" className={styles.searchInput} />{' '}
          <FiSearch className={styles.icon} />{' '}
        </div>{' '}
      </div>

      <div className={styles.navbarRight}>
        {user ? (
          <>
            <Link to="/profile">
              <span>
                Hi, {user.username} ({user.role})
              </span>
            </Link>
            <button className={styles.signin} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className={styles.signin}>Join us</button>
          </Link>
        )}
      </div>
    </div>
  )
}
export default Navbar
