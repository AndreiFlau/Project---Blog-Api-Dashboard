import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function useFetchComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const result = await fetch(`${API_URL}/api/comments/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!result.ok) {
          throw new Error("Network response was not ok");
        }

        const resJson = await result.json();

        const commentArray = await Promise.all(
          resJson.map(async (comment) => {
            const userResult = await fetch(`${API_URL}/api/users/${comment.userId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            const userJson = await userResult.json();

            const formattedComments = {
              id: comment.id,
              content: comment.content,
              date: comment.date,
              userId: comment.userId,
              postId: comment.postId,
              author: userJson.username,
            };

            return formattedComments;
          })
        );

        setComments(commentArray);
      } catch (error) {
        console.log(`Failed to fetch comments: `, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, []);

  return { comments, loading, error };
}

export default useFetchComments;
