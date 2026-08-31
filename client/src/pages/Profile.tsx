import { useState } from 'react'
import styles from './Profile.module.css'

import pfp from '../assets/pfp.png'

import type { User } from '../App'

type Props = {
  user: User
  onUpdateUser?: (updated: User) => void
}

type View = 'overview' | 'edit'

function Profile({ user, onUpdateUser }: Props) { 
  const [view, setView] = useState<View>('overview')

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function openEdit() {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })
    setError(null)
    setView('edit')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setIsSaving(true)
    setError(null)

    try {
      const res = await fetch('http://localhost:3000/api/auth/me', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      onUpdateUser?.(data.user)
      setView('overview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Profile</h2>

        <ul className={styles.menu}>
          <li
            className={view === 'overview' ? styles.active : ''}
            onClick={() => setView('overview')}
          >
            Account Overview
          </li>

          <li className={view === 'edit' ? styles.active : ''} onClick={openEdit}>
            Edit Profile
          </li>

          <li>Security</li>

          <li>Notifications</li>

          <li>Settings</li>
        </ul>
      </div>

      <div className={styles.content}>
        {view === 'overview' && (
          <>
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

                <button className={styles.editBtn} onClick={openEdit}>
                  Edit
                </button>
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

                        <span className={styles.pendingBadge}>
                          {application.verificationStatus}
                        </span>
                      </div>

                      <div className={styles.applicationDetails}>
                        {Object.entries(application.verificationData || {}).map(
                          ([key, value]) => (
                            <p key={key}>
                              <strong>{key}:</strong> {String(value)}
                            </p>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No requested roles.</p>
              )}
            </section>
          </>
        )}

        {view === 'edit' && (
          <form className={styles.section} onSubmit={handleSubmit}>
            <div className={styles.sectionHeader}>
              <h2>Edit Profile</h2>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <label htmlFor="firstName">First Name</label>

                <input
                  id="firstName"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  disabled={isSaving}
                />
              </div>

              <div className={styles.infoCard}>
                <label htmlFor="lastName">Last Name</label>

                <input
                  id="lastName"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  disabled={isSaving}
                />
              </div>

              <div className={styles.infoCard}>
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className={styles.sectionHeader}>
              <button type="submit" className={styles.editBtn} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>

              <button
                type="button"
                className={styles.editBtn}
                onClick={() => setView('overview')}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile