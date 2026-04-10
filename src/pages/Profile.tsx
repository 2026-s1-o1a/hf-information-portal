import styles from './Profile.module.css'
import logo from '../assets/logo.png'

import type { User } from '../App'

type Props = {
  user: User
}

function Profile({ user }: Props) {
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
      </div>
    </div>
  )
}

export default Profile
