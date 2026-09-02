import styles from './Register.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'
import type { User } from '../App'

type Props = {
  setUser: Dispatch<SetStateAction<User | null>>
}

function Register({ setUser }: Props) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const newUser: User = { email, username, password }

    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)

    navigate('/profile')
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2>Create Account</h2>

        <div className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className={styles.registerBtn} onClick={handleRegister}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
