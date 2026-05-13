// const BASE_URL = 'http://localhost:58609';

export type Post = {
    id: string;
    name: string;
    contentType: string;
    route?: {
      path: string;
    };
    properties: Record<string, any>;
}

export async function getPosts() {
  const res = await fetch(
    '/umbraco/delivery/api/v2/content?'
  );

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.properties?.pageTitle || item.name,
    body: item.properties?.overview || "",
    route: item.route,
    properties: item.properties
  }));
}

export async function getContentBySlug(slug: string){
  const res = await fetch(
    `/umbraco/delivery/api/v2/content/item/${slug}`
  );

  if(!res.ok){
    throw new Error("Failed to fetch");
  }

  const data = await res.json();

  console.log("Content Item:", data);

  return data;

}