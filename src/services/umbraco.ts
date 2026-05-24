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

  return data.items
  .filter((item: any) => item.route?.path && item.route.path !== '/')
  .map((item: any) => {
    return {
      id: item.id,
      title: item.properties?.pageTitle || item.name,
      body: item.properties?.overview || "",
      route: item.route,
      contentType: item.contentType,
      properties: item.properties,
      createDate: item.createDate,
      updateDate: item.updateDate
    }
  });
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