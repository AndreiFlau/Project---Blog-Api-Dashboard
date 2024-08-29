import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function useDeleteComment() {
  const [error, setError] = useState(null);

  async function deleteComment(commentId) {
    try {
      const result = await fetch(`${API_URL}/admin/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(`Failed to delete comment: `, error);
      setError(error);
    }
  }

  return { error, deleteComment };
}

export default useDeleteComment;
