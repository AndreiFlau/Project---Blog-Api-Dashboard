import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function useFetchPosts(userData) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    } else {
      setLoading(true);
    }
    async function fetchPosts() {
      try {
        const result = await fetch(`${API_URL}/api/posts/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!result.ok) {
          throw new Error("Network response was not ok");
        }

        const resJson = await result.json();

        const postArray = await Promise.all(
          resJson.map(async (post) => {
            const userResult = await fetch(`${API_URL}/api/users/${post.userId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            const userJson = await userResult.json();

            const formattedPosts = {
              id: post.id,
              title: post.title,
              content: post.content,
              date: post.date,
              userId: post.userId,
              published: post.published,
              author: userJson.username,
            };

            return formattedPosts;
          })
        );

        setPosts(postArray);
      } catch (error) {
        console.log(`Failed to fetch posts: `, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userData]);

  return { posts, loading, error };
}

export default useFetchPosts;
