// const BASE_URL = 'http://localhost:58609';

export type Post = {
    id: string;
    title: string;
    body: string;
}

export async function getPosts() {
  const res = await fetch(
    '/umbraco/delivery/api/v2/content?filter=contentType:contentPage'
  );

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.properties?.pageTitle || item.name,
    body: item.properties?.bodyContent?.markup || ""
  }));
}