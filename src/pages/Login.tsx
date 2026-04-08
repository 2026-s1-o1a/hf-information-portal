
function Login() {
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Sign in</h2>
        <div className="register-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="register-btn">Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Login
