import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getContentBySlug } from '../services/umbraco'

import ConditionTemplate from '../templates/ConditionTemplate'
import ContentTemplate from '../templates/ContentTemplate'
import VideoTemplate from '../templates/VideoTemplate'
import NewsTemplate from '../templates/NewsTemplate'

type RichText = {
  markup: string
}

type ImageItem = {
  url: string
  name: string
}

type ContentProperties = {
  pageTitle?: string
  overview?: string

  image?: ImageItem[]

  bodyContent?: RichText
  body?: RichText
  description?: RichText

  symptoms?: RichText
  causes?: RichText
  treatments?: RichText

  videoUrl?: string

  date?: string
  author?: string
}

type Content = {
  id?: string
  name?: string
  contentType: string
  properties: ContentProperties
}

function ContentDetailPage() {
  const params = useParams()

  const slug = params['*'] || params.slug

  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    const fetchContent = async () => {
      try {
        const data = await getContentBySlug(slug)

        setContent(data as Content)
      } catch (error) {
        console.error(error)

        setContent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [slug])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!content) {
    return <p>Content not found.</p>
  }

  switch (content.contentType) {
    case 'conditionPage':
      return <ConditionTemplate content={content} />

    case 'contentPage':
      return <ContentTemplate content={content} />

    case 'videoPage':
      return <VideoTemplate content={content} />

    case 'newsPage':
      return <NewsTemplate content={content} />

    default:
      return <p>Unknown content type: {content.contentType}</p>
  }
}

export default ContentDetailPage
