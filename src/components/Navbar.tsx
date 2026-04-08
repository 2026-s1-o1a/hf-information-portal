import { Link } from 'react-router-dom'
import './Navbar.css'
import { FiMenu, FiSearch } from 'react-icons/fi'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="logo" />
        <span className="title">HF Portal</span>
      </div>

      <div className="navbar-center">
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
        <div className="search-bar">
          <FiMenu className="icon" />

          <input type="text" placeholder="Search" className="search-input" />

          <FiSearch className="icon" />
        </div>
      </div>

      <div className="navbar-right">
        <button className="signin">Sign In</button>
      </div>
    </div>
  )
}
export default Navbar
