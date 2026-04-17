import styles from './Profile.module.css'
import logo from '../assets/logo.png'

import { useState } from 'react'
import type { User } from '../App'

type Props = {
  user: User
}

function Profile({ user }: Props) {
  // load all users (DB REPLACE later)
  const [users, setUsers] = useState<User[]>(() => {
    return JSON.parse(localStorage.getItem('users') || '[]')
  })

  // admin role update function
  const updateUserRole = (email: string, role: User['role']) => {
    const updatedUsers = users.map(u => (u.email === email ? { ...u, role } : u))

    setUsers(updatedUsers)

    // DB REPLACE:
    // PATCH /users/:id
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    // update current session if needed
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null')

    if (current && current.email === email) {
      const updatedCurrent = { ...current, role }
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrent))
    }
  }

  return (
    <div className={styles.page}>
      {/* LEFT SIDEBAR */}
      <div className={styles.sidebar}>
        <h2 className={styles.title}>User Profile</h2>

        <ul className={styles.menu}>
          <li className={styles.active}>Profile Details</li>
          <li>Notifications</li>
          <li>Subscriptions</li>
          <li>Language</li>
          <li>Settings</li>
          <li>Dashboard</li>
        </ul>

        <div className={styles.logout}>Logout</div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.content}>
        <div className={styles.formSection}>
          <div className={styles.formFields}>
            <div className={styles.field}>
              <label>Username</label>
              <div className={styles.inputRow}>
                <input type="text" value={user.username} readOnly />
                <span className={styles.editIcon}>🖍</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>Email Address</label>
              <div className={styles.inputRow}>
                <input type="email" value={user.email} readOnly />
                <span className={styles.editIcon}>🖍</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <div className={styles.inputRow}>
                <input type="password" value={user.password} readOnly />
                <span className={styles.editIcon}>🖍</span>
              </div>
            </div>
          </div>

          <div className={styles.avatarSection}>
            <img src={logo} alt="avatar" className={styles.avatar} />
          </div>
        </div>

        {/* ADMIN PANEL */}
        {user.role === 'admin' && (
          <div style={{ marginTop: '30px' }}>
            <h3>Admin Panel — Manage Users</h3>

            {users.map(u => (
              <div
                key={u.email}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              >
                <p>
                  {u.email} — <b>{u.role}</b>
                </p>

                {/* promote from user */}
                {u.role === 'user' && (
                  <>
                    <button onClick={() => updateUserRole(u.email, 'doctor')}>Make Doctor</button>

                    <button onClick={() => updateUserRole(u.email, 'custodian')}>
                      Make Custodian
                    </button>
                  </>
                )}

                {/* revert */}
                {u.role !== 'user' && u.role !== 'admin' && (
                  <button onClick={() => updateUserRole(u.email, 'user')}>Revert to User</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
