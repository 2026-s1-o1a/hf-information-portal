import styles from './Register.module.css'

function Login() {
  return (
    <div className={styles['register-container']}>
      <div className={styles['register-card']}>
        <h2>Sign in</h2>
        <div className={styles['register-form']}>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className={styles['register-btn']}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Login
