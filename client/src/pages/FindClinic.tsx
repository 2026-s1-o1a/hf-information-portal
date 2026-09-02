import ClinicMap from '../components/ClinicMap'
import styles from './FindClinic.module.css'

function FindClinic() {
  return (
    <main className={styles.findClinicPage}>
      <h1>Find a Clinic Near You</h1>

      <p>Search for healthcare services and clinics available near you.</p>

      <ClinicMap />
    </main>
  )
}

export default FindClinic
