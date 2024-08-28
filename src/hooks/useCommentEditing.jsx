import { useState } from "react";

function useCommentEditing() {
  const [error, setError] = useState(null);

  async function editComment(content, commentId) {
    try {
      const result = await fetch(`http://localhost:8080/admin/comments/${commentId}`, {
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
