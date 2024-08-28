import { useState } from "react";

function useDeletePost() {
  const [error, setError] = useState(null);

  async function deletePost(postId) {
    try {
      const result = await fetch(`http://localhost:8080/admin/posts/${postId}`, {
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
      console.log(`Failed to delete post: `, error);
      setError(error);
    }
  }

  return { error, deletePost };
}

export default useDeletePost;
