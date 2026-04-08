import './Register.css'
function Register() {
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <div className="register-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>
          <button className="register-btn">Create Account</button>
        </div>
      </div>
    </div>
  )
}

export default Register
