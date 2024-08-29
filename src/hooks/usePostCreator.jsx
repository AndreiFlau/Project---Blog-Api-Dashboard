import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function usePostCreator() {
  const [error, setError] = useState(null);

  async function createPost(content) {
    try {
      const result = await fetch(`${API_URL}/admin/posts/`, {
        method: "POST",
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

  return { error, createPost };
}

export default usePostCreator;
