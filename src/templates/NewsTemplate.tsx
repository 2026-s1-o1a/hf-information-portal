import styles from './Templates.module.css'

function NewsTemplate({ content }: any) {
  const props = content.properties;

  return (
    <main className={styles.page}>
      <span className={styles.badge}>News</span>
      <h1 className={styles.title}>{props.pageTitle}</h1>

      <div className={styles.meta}>
        {props.date && <span>{props.date}</span>}
        {props.author && <span>By {props.author}</span>}
      </div>

      {props.overview && <p className={styles.overview}>{props.overview}</p>}

      {props.body?.markup && (
        <section className={styles.section}>
          <div dangerouslySetInnerHTML={{ __html: props.body.markup }} />
        </section>
      )}
    </main>
  )
}

export default NewsTemplate