import styles from './Register.module.css'

function Register() {
  return (
    <div className={styles['register-container']}>
      <div className={styles['register-card']}>
        <h2>Create Account</h2>
        <div className={styles['register-form']}>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className={styles['form-group']}>
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className={styles['form-group']}>
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>
          <button className={styles['register-btn']}>Create Account</button>
        </div>
      </div>
    </div>
  )
}

export default Register
