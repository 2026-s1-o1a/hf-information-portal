import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link> | 
      <Link to="/profile">Profile</Link> | 
      <Link to="/search">Search</Link> |
    </div>
  )
}
export default Navbar