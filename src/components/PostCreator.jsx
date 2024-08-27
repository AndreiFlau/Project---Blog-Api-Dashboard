import { useState } from "react";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import usePostCreator from "../hooks/usePostCreator";

function PostCreator() {
  const { error, createPost } = usePostCreator();
  const navigate = useNavigate();
  const [createdPost, setCreatedPost] = useState({
    title: "",
    content: "",
    published: false,
  });

  // if (error) return <div>Oops, something happened. {error.message}</div>;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setCreatedPost((prevPost) => ({
      ...prevPost,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleEditing(e) {
    e.preventDefault();
    await createPost(createdPost);
    if (!error) {
      alert("Post created successfully.");
      navigate("/");
    }
  }

  return (
    <>
      <h1>Create your post</h1>
      {error && <h1>{error.message}</h1>}
      <div className="post">
        <form onSubmit={handleEditing}>
          <label htmlFor="title">Title:</label>
          <input type="title" id="title" name="title" value={createdPost.title} onChange={handleChange} required />
          <label htmlFor="username">Content:</label>
          <textarea
            type="text"
            id="content"
            name="content"
            value={createdPost.content}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="published">Published? </label>
          <input type="checkbox" id="published" name="published" checked={createdPost.published} onChange={handleChange} />
          <button type="submit">Create Post</button>
        </form>
      </div>
      <Link to="/">Return to homepage</Link>
    </>
  );
}

export default PostCreator;
