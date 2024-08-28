import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useFetchOneComment() {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { commentId } = useParams();

  useEffect(() => {
    async function FetchOneComment() {
      try {
        const result = await fetch(`http://localhost:8080/api/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!result.ok) {
          throw new Error("Network response was not ok");
        }

        const resJson = await result.json();

        const userResult = await fetch(`http://localhost:8080/api/users/${resJson.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const userJson = await userResult.json();

        const formattedComment = {
          id: resJson.id,
          content: resJson.content,
          date: resJson.date,
          userId: resJson.userId,
          postId: resJson.postId,
          author: userJson.username,
        };

        setComment(formattedComment);
      } catch (error) {
        console.log(`Failed to fetch comment: `, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    FetchOneComment();
  }, [commentId]);

  return { comment, loading, error };
}

export default useFetchOneComment;