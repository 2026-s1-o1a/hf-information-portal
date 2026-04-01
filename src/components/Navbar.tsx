import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-expand-md navbar-dark bg-primary">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className={"nav-link"}>
                Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/features" className={"nav-link"}>
                Features
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pricing" className={"nav-link"}>
                Pricing
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;