import styles from './Templates.module.css'

function ContentTemplate({ content }: any) {
  const props = content.properties;
  return (
    <main className={styles.page}>
      <span className={styles.badge}>Article</span>
      <h1 className={styles.title}>{props.pageTitle}</h1>

      {props.overview && <p className={styles.overview}>{props.overview}</p>}

      {props.image?.length > 0 && (
        <section className={styles.section}>
          <img
            src={`http://localhost:58609${props.image[0].url}`}
            alt={props.image[0].name}
            className={styles.image}
          />
        </section>
      )}

      {props.bodyContent?.markup && (
        <section className={styles.section}>
          <div dangerouslySetInnerHTML={{ __html: props.bodyContent.markup }} />
        </section>
      )}
    </main>
  );
}
export default ContentTemplate;