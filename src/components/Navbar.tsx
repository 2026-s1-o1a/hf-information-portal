import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link> | 
      <Link to="/profile">Profile</Link> | 
      <Link to="/search">Search</Link> |
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}
export default Navbar
