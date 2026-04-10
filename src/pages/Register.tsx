import styles from './Register.module.css'

function Register() {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2>Create Account</h2>
        <div className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>
          <button className={styles.registerBtn}>Create Account</button>
        </div>
      </div>
    </div>
  )
}

export default Register
