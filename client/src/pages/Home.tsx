import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import type { User } from '../App'

type Props = {
  user: User | null
}

function Home({ user }: Props) {
  const navigate = useNavigate()

  const handleCardClick = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank')
    } else {
      navigate(path)
    }
  }

  return (
    <div className={styles.homeContainer}>
      {/* Hero section */}
      <section className={styles.heroSection}>
        <h1>Heart Failure Information Portal</h1>

        <p>
          Trusted heart failure information and healthcare resources for patients, clinicians and
          healthcare organisations.
        </p>
      </section>

      {/* Features */}
      <section className={styles.cardsSection}>
        <h2>Featured Resources</h2>

        <div className={styles.cardGrid}>
          <div
            className={styles.card}
            onClick={() => handleCardClick('https://ceih.sa.gov.au/news-and-events')}
            style={{ cursor: 'pointer' }}
          >
            <h3>News and Events</h3>

            <p>
              Stay up to date with the latest stories, insights, and achievements from across the
              CEIH. Explore how our work is shaping innovation and impact in health and research.
            </p>
          </div>

          <div
            className={styles.card}
            onClick={() => handleCardClick('https://ceih.sa.gov.au/clinical-networks')}
            style={{ cursor: 'pointer' }}
          >
            <h3>Clinical Networks</h3>

            <p>
              Connecting clinicians, consumers and partners to drive innovation and improve
              healthcare across South Australia.
            </p>
          </div>

          <div className={styles.card}>
            <h3>3</h3>

            <p>GHI</p>
          </div>
          {user && !user.roles?.includes('admin') && (
            <div
              className={styles.card}
              onClick={() => handleCardClick('/apply-role')}
              style={{ cursor: 'pointer' }}
            >
              <h3>Apply for Additional Roles</h3>

              <p>
                Clinicians, doctors, pharmacies and content custodians can apply for additional
                access permissions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Test div */}
      {user && (
        <section className={styles.dashboardSection}>
          <h2>Welcome back</h2>

          <div className={styles.dashboardCard}>
            <p>
              <strong>{user.roles?.join(', ')}</strong>
            </p>

            <p>Test</p>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
