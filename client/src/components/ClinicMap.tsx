import styles from './ClinicMap.module.css'

function ClinicMap() {
  const query = encodeURIComponent('clinics near me') // or a fixed city/region
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  return (
    <section className={styles.mapSection}>
      <h2>Find a Clinic Near You</h2>
      <div className={styles.mapWrapper}>
        <iframe
          className={styles.mapFrame}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${query}`}
        />
      </div>
    </section>
  )
}

export default ClinicMap