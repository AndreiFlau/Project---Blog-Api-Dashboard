import { useEffect, useState } from "react";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import usePostEditing from "../hooks/usePostEditing";
import useFetchOnePost from "../hooks/useFetchOnePost";

function PostEditor() {
  const { error, editPost } = usePostEditing();
  const navigate = useNavigate();
  const { post, loading } = useFetchOnePost();
  const [edittedPost, setEdittedPost] = useState({
    title: "",
    content: "",
    published: false,
  });

  // if (error) return <div>Oops, something happened. {error.message}</div>;

  useEffect(() => {
    if (post) {
      setEdittedPost(post);
    }
  }, [post]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setEdittedPost((prevPost) => ({
      ...prevPost,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleEditing(e) {
    e.preventDefault();
    await editPost(edittedPost, post.id);
    if (!error) {
      alert("Post edited successfully.");
      navigate("/");
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
            <input type="title" id="title" name="title" value={edittedPost.title} onChange={handleChange} required />
            <label htmlFor="content">Content:</label>
            <textarea
              type="text"
              id="content"
              name="content"
              value={edittedPost.content}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="published">Published? </label>
            <input type="checkbox" id="published" name="published" checked={edittedPost.published} onChange={handleChange} />
            <button type="submit">Edit Post</button>
          </form>
        </div>
      )}
      <Link to="/">Return to homepage</Link>
    </>
  );
}

export default PostEditor;
