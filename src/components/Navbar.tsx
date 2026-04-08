import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { FiMenu, FiSearch } from 'react-icons/fi'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <img src={logo} alt="logo" className={styles.logo} />
        <span className={styles.title}>HF Portal</span>
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
          <FiMenu className={styles.icon} />

          <input type="text" placeholder="Search" className={styles.input} />

          <FiSearch className={styles.icon} />
        </div>
      </div>

      <div className={styles.navbarRight}>
        <button className={styles.signin}>Sign In</button>
      </div>
    </div>
  )
}
export default Navbar
