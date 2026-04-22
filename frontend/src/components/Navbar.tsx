import { Link  } from 'react-router-dom'

import styles from './Navbar.module.css'
import logo from '../assets/logo.png'
import { FiMenu, FiSearch } from 'react-icons/fi'

function Navbar() {

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Link to="/" className={styles.logoLink}>
          {/* LOGO <img src={logo} alt="logo" className={styles.logo} /> */}
          <span className={styles.title}>Heart Failure Information Portal</span>
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
          <Link to="/signin">
            <button className={styles.signin}>Sign In</button>
          </Link>
          <Link to="/signup">
            <button className={styles.signin}>Sign Up</button>
          </Link>
      </div>
    </div>
  )
}
export default Navbar
