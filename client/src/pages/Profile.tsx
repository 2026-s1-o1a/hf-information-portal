import styles from './Profile.module.css'

import pfp from '../assets/pfp.png'

import type { User } from '../App'

type Props = {
  user: User
}

function Profile({ user }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Profile</h2>

        <ul className={styles.menu}>
          <li className={styles.active}>Account Overview</li>

          <li>Edit Profile</li>

          <li>Security</li>

          <li>Notifications</li>

          <li>Settings</li>
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.headerSection}>
          <img src={pfp} alt="profile" className={styles.avatar} />

          <div>
            <h1>
              {user.firstName} {user.lastName}
            </h1>

            <p>{user.email}</p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Personal Information</h2>

            <button className={styles.editBtn}>Edit</button>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <label>First Name</label>

              <p>{user.firstName}</p>
            </div>

            <div className={styles.infoCard}>
              <label>Last Name</label>

              <p>{user.lastName}</p>
            </div>

            <div className={styles.infoCard}>
              <label>Email Address</label>

              <p>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Roles */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Roles</h2>
          </div>

          <div className={styles.rolesContainer}>
            {user.roles?.map(role => (
              <div key={role} className={styles.roleBadge}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </div>
            ))}
          </div>
        </section>

        {/* Requested Roles */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Requested Roles</h2>
          </div>

          {user.pendingApplications?.length ? (
            <div className={styles.pendingApplications}>
              {user.pendingApplications?.map(application => (
                <div key={application.requestedRole} className={styles.applicationCard}>
                  <div className={styles.applicationTop}>
                    <h3>
                      {application.requestedRole === 'custodian'
                        ? 'Content Custodian'
                        : application.requestedRole.charAt(0).toUpperCase() +
                          application.requestedRole.slice(1)}
                    </h3>

                    <span className={styles.pendingBadge}>{application.verificationStatus}</span>
                  </div>

                  <div className={styles.applicationDetails}>
                    {Object.entries(application.verificationData || {}).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No requested roles.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default Profile
