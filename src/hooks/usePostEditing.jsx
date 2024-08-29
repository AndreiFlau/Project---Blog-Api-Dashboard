import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function usePostEditing() {
  const [error, setError] = useState(null);

  async function editPost(content, postId) {
    try {
      const result = await fetch(`${API_URL}/admin/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ title: content.title, content: content.content, published: content.published }),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(`Failed to edit post: `, error);
      setError(error);
    }
  }

  return { error, editPost };
}

export default usePostEditing;
