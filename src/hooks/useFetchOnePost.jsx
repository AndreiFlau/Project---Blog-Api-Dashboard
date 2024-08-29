import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function useFetchOnePost() {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    async function FetchOnePost() {
      try {
        const result = await fetch(`${API_URL}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!result.ok) {
          throw new Error("Network response was not ok");
        }

        const resJson = await result.json();

        const userResult = await fetch(`${API_URL}/api/users/${resJson.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const userJson = await userResult.json();

        const formattedPost = {
          id: resJson.id,
          title: resJson.title,
          content: resJson.content,
          date: resJson.date,
          userId: resJson.userId,
          published: resJson.published,
          author: userJson.username,
        };

        setPost(formattedPost);
      } catch (error) {
        console.log(`Failed to fetch posts: `, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    FetchOnePost();
  }, [postId]);

  return { post, loading, error };
}

export default useFetchOnePost;
