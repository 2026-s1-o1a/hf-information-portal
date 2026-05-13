import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      {posts.map((post) => {
        const slug =
          post.route?.path?.replace("/", "") || "";

        return (
          <div key={post.id}>
            <Link to={`/content/${slug}`}>
              {post.properties.pageTitle || post.id}
            </Link>
            <div
            dangerouslySetInnerHTML={{
              __html: post.properties.overview
            }}
          />
          </div>
        );
      })}
    </div>
  );
}

export default PostList;