import styles from './Register.module.css'

function Login() {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2>Sign in</h2>
        <div className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className={styles.registerBtn}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Login
