import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function useCommentEditing() {
  const [error, setError] = useState(null);

  async function editComment(content, commentId) {
    try {
      const result = await fetch(`${API_URL}/admin/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ content: content }),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(`Failed to edit comment: `, error);
      setError(error);
    }
  }

  return { error, editComment };
}

export default useCommentEditing;
