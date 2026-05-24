export type Post = {
  id: string

  title: string

  body?: string

  contentType: string

  createDate?: string
  updateDate?: string

  route?: {
    path: string
  }

  properties: Record<string, unknown>
}

type UmbracoApiItem = {
  id: string

  name: string

  contentType: string

  createDate?: string
  updateDate?: string

  route?: {
    path: string
  }

  properties: {
    pageTitle?: string
    overview?: string
    [key: string]: unknown
  }
}

type UmbracoApiResponse = {
  items: UmbracoApiItem[]
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch('/umbraco/delivery/api/v2/content')

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  const data: UmbracoApiResponse = await res.json()

  return data.items
    .filter(item => item.route?.path && item.route.path !== '/')
    .map(item => ({
      id: item.id,

      title: item.properties?.pageTitle || item.name,

      body: item.properties?.overview || '',

      route: item.route,

      contentType: item.contentType,

      properties: item.properties,

      createDate: item.createDate,

      updateDate: item.updateDate,
    }))
}

export async function getContentBySlug(slug: string) {
  const cleanedSlug = slug.startsWith('/') ? slug.substring(1) : slug

  const res = await fetch(`/umbraco/delivery/api/v2/content/item/${cleanedSlug}`)

  if (!res.ok) {
    throw new Error('Failed to fetch content')
  }

  const data = await res.json()

  return data
}