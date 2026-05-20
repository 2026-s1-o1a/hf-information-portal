import styles from './Home.module.css'

import type { User } from '../App'

type Props = {
  user: User | null
}

function Home({ user }: Props) {
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
          <div className={styles.card}>
            <h3>News and Events</h3>
            <p>
              Stay up to date with the latest stories, insights, and achievements from across the
              CEIH. Explore how our work is shaping innovation and impact in health and research.
            </p>
            <a
              href="https://ceih.sa.gov.au/news-and-events"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </div>

          <div className={styles.card}>
            <h3>Clinical Networks</h3>
            <p>
              Connecting clinicians, consumers and partners to drive innovation and improve
              healthcare across South Australia.
            </p>
            <a
              href="https://ceih.sa.gov.au/clinical-networks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </div>

          <div className={styles.card}>
            <h3>3</h3>

            <p>GHI</p>
          </div>

          <div className={styles.card}>
            <h3>4</h3>

            <p>JKL</p>
          </div>
        </div>
      </section>

      {/* Test div */}
      {user && (
        <section className={styles.dashboardSection}>
          <h2>Welcome back</h2>

          <div className={styles.dashboardCard}>
            <p>
              Logged in as: <strong>{user.role}</strong>
            </p>

            <p>Test</p>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
