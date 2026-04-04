import { Link } from 'react-router-dom'
import Home from '../pages/Home'
import './Navbar.css'

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link> | 
      <Link to="/profile">Profile</Link> | 
      <Link to="/search">Search</Link> |
      <Link to="/register">Register/Login</Link>
    </div>
  )
}
export default Navbar
