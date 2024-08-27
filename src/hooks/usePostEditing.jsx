import { useState } from "react";

function usePostEditing() {
  const [error, setError] = useState(null);

  async function editPost(content, postId) {
    try {
      const result = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ content }),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(`Failed to register user: `, error);
      setError(error);
    }
  }

  return { error, editPost };
}

export default usePostEditing;
