import { useState } from "react";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import usePostCreator from "../hooks/usePostCreator";
import TinyMCEEditor from "./tinyMCEEditor";

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

  function handleEditorChange(content) {
    setCreatedPost((prevPost) => ({
      ...prevPost,
      content: content,
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
      <div className="post-creator">
        <h1>Create your post</h1>
        {error && <h1>{error.message}</h1>}
        <div className="post">
          <form onSubmit={handleEditing}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={createdPost.title} onChange={handleChange} required />
            <label htmlFor="content">Content:</label>
            <TinyMCEEditor initialValue="" value={createdPost.content} onChange={handleEditorChange} />
            <div className="published">
              <label htmlFor="published">Published? </label>
              <input type="checkbox" id="published" name="published" checked={createdPost.published} onChange={handleChange} />
            </div>
            <button type="submit">Create Post</button>
          </form>
          <button type="button" className="link-btn">
            <Link to="/">Return to homepage</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default PostCreator;
