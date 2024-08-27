import { useState } from "react";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";
import usePostEditing from "../hooks/usePostEditing";
import useFetchOnePost from "../hooks/useFetchOnePost";

function PostEditor() {
  const { error, editPost } = usePostEditing();
  const navigate = useNavigate();
  const { post, loading } = useFetchOnePost();
  const [edditedPost, setEdittedPost] = useState(post);

  // if (error) return <div>Oops, something happened. {error.message}</div>;

  function handleChange(e) {
    const { name, value } = e.target;
    setEdittedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  }

  async function handleEditing(e) {
    e.preventDefault();
    try {
      const result = await editPost(post, post.id);

      if (result.success) {
        navigate("/");
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h1>Edit your post</h1>
      {error && <h1>{error.message}</h1>}
      {!loading && (
        <div className="post">
          <form onSubmit={handleEditing}>
            <label htmlFor="title">Title:</label>
            <input type="title" id="title" name="title" value={post.title} onChange={handleChange} required />
            <label htmlFor="username">Username:</label>
            <input type="text" id="content" name="content" value={post.content} onChange={handleChange} required />
            <label htmlFor="published">Published? </label>
            <input type="checkbox" id="published" name="published" checked={post.published} onChange={handleChange} />
            <button type="submit">Edit Post</button>
          </form>
        </div>
      )}
    </>
  );
}

export default PostEditor;
