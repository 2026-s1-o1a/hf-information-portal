import styles from './Profile.module.css'
import logo from '../assets/logo.png'

function Profile() {
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
        {/* FORM SECTION */}
        <div className={styles.formSection}>
          <div className={styles.formFields}>
            <div className={styles.field}>
              <label>First Name:</label>
              <div className={styles.inputRow}>
                <input type="text" defaultValue="John" />
                <span className={styles.editIcon}>🖍</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>Last Name:</label>
              <div className={styles.inputRow}>
                <input type="text" defaultValue="Doe" />
                <span className={styles.editIcon}>🖍</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>Email Address</label>
              <div className={styles.inputRow}>
                <input type="email" defaultValue="johndoe01@gmail.com" />
                <span className={styles.editIcon}>🖍</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>Phone Number</label>
              <div className={styles.inputRow}>
                <input type="text" defaultValue="04xx xxx xxx" />
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
