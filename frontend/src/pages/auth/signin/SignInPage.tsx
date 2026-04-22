import styles from "../auth.module.css";

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'
import type { User } from '../../../App'

type Props = {
  setUser: Dispatch<SetStateAction<User | null>>
}

function SignInPage({ setUser }: Props) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    const foundUser = users.find(u => u.email === email && u.password === password)

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      setUser(foundUser)
      navigate('/')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Sign in</h2>

        <div className={styles.authForm}>
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
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.authBtn} onClick={handleLogin}>
            Log in
          </button>

          <button className={styles.authBtn} onClick={() => navigate('/register')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
