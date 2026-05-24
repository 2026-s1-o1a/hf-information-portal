import styles from './Templates.module.css'

type RichText = {
  markup: string
}

type ContentProperties = {
  pageTitle?: string
  overview?: string
  description?: RichText
  videoUrl?: string
}

type Content = {
  properties: ContentProperties
}

type Props = {
  content: Content
}

function getEmbedUrl(url: string) {
  try {
    const urlObj = new URL(url)
    const videoId = urlObj.searchParams.get('v')

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }

    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]

      return `https://www.youtube.com/embed/${id}`
    }

    return url
  } catch {
    return url
  }
}

function VideoTemplate({ content }: Props) {
  const props = content.properties

  return (
    <main className={styles.page}>
      <span className={styles.badge}>Video</span>

      <h1 className={styles.title}>{props.pageTitle}</h1>

      {props.overview && <p className={styles.overview}>{props.overview}</p>}

      {props.description?.markup && (
        <section className={styles.section}>
          <div dangerouslySetInnerHTML={{ __html: props.description.markup }} />
        </section>
      )}

      {props.videoUrl && (
        <section className={styles.section}>
          <div className={styles.videoWrapper}>
            <iframe src={getEmbedUrl(props.videoUrl)} title="Video" allowFullScreen />
          </div>
        </section>
      )}
    </main>
  )
}

export default VideoTemplate
