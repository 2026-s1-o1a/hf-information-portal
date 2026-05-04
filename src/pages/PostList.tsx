import { useEffect, useState } from "react";
import { getPosts } from "../services/umbraco";
import type { Post } from "../services/umbraco";

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        console.log("POSTS FROM API:", data);
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load posts");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {posts.length === 0 && <p>No posts found.</p>}

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "1rem" }}>
          <h4>{post.title}</h4>
          <div
            dangerouslySetInnerHTML={{
            __html: post.body || ""
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default PostList;