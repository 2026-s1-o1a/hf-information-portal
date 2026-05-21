import styles from './Profile.module.css'
import logo from '../assets/logo.png'

import { useState } from 'react'

import type { User } from '../App'

type Props = {
  user: User
}

function Profile({ user }: Props) {
  const [users, setUsers] = useState<User[]>(() => {
    return JSON.parse(localStorage.getItem('users') || '[]')
  })

  const updateUserVerification = (
    email: string,
    role: User['role'],
    verificationStatus: 'approved' | 'rejected'
  ) => {
    const updatedUsers = users.map(u => {
      if (u.email !== email) return u

      return {
        ...u,

        role: verificationStatus === 'approved' ? role : 'patient',

        verificationStatus,
      }
    })

    setUsers(updatedUsers)

    localStorage.setItem('users', JSON.stringify(updatedUsers))

    const current = JSON.parse(localStorage.getItem('currentUser') || 'null')

    if (current && current.email === email) {
      const updatedCurrent = updatedUsers.find(u => u.email === email)

      localStorage.setItem('currentUser', JSON.stringify(updatedCurrent))
    }
  }

  return (
    <div className={styles.page}>
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

      <div className={styles.content}>
        <div className={styles.formSection}>
          <div className={styles.formFields}>
            <div className={styles.field}>
              <label>Full Name</label>

              <div className={styles.inputRow}>
                <input type="text" value={`${user.firstName} ${user.lastName}`} readOnly />

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
              <label>Role</label>

              <div className={styles.inputRow}>
                <input type="text" value={user.role} readOnly />
              </div>
            </div>

            <div className={styles.field}>
              <label>Verification Status</label>

              <div className={styles.inputRow}>
                <input type="text" value={user.verificationStatus || 'none'} readOnly />
              </div>
            </div>

            {user.requestedRole && user.requestedRole !== 'patient' && (
              <div className={styles.field}>
                <label>Requested Role</label>

                <div className={styles.inputRow}>
                  <input type="text" value={user.requestedRole} readOnly />
                </div>
              </div>
            )}
          </div>

          <div className={styles.avatarSection}>
            <img src={logo} alt="avatar" className={styles.avatar} />
          </div>
        </div>

        {user.roles?.includes('admin') && (
          <div style={{ marginTop: '30px' }}>
            <h3>Admin Panel — Verification Requests</h3>

            {users
              .filter(u => u.verificationStatus === 'pending')
              .map(u => (
                <div
                  key={u.email}
                  style={{
                    border: '1px solid #ccc',

                    padding: '15px',

                    marginBottom: '15px',

                    borderRadius: '8px',
                  }}
                >
                  <p>
                    <b>
                      {u.firstName} {u.lastName}
                    </b>
                  </p>

                  <p>{u.email}</p>

                  <p>
                    Requested Role: <b>{u.requestedRole}</b>
                  </p>

                  {u.verificationData?.organisation && (
                    <p>Organisation: {u.verificationData.organisation}</p>
                  )}

                  {u.verificationData?.workEmail && (
                    <p>Organisation Email: {u.verificationData.workEmail}</p>
                  )}

                  {u.verificationData?.phoneNumber && (
                    <p>Organisation Phone: {u.verificationData.phoneNumber}</p>
                  )}

                  {u.verificationData?.ahpraNumber && (
                    <p>ID / AHPRA: {u.verificationData.ahpraNumber}</p>
                  )}

                  {u.verificationData?.licenseNumber && (
                    <p>License Number: {u.verificationData.licenseNumber}</p>
                  )}

                  <button
                    onClick={() =>
                      updateUserVerification(u.email, u.requestedRole as User['role'], 'approved')
                    }
                  >
                    Approve
                  </button>

                  <button
                    style={{
                      marginLeft: '10px',
                    }}
                    onClick={() => updateUserVerification(u.email, 'patient', 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
