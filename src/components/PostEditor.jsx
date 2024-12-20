import { useEffect, useState } from "react";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import usePostEditing from "../hooks/usePostEditing";
import useFetchOnePost from "../hooks/useFetchOnePost";
import TinyMCEEditor from "./tinyMCEEditor";

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

  function handleEditorChange(content) {
    setEdittedPost((prevPost) => ({
      ...prevPost,
      content: content,
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
      <div className="post-creator">
        <h1>Edit your post</h1>
        {error && <h1>{error.message}</h1>}
        {!loading ? (
          <div className="post">
            <form onSubmit={handleEditing}>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" value={edittedPost.title} onChange={handleChange} required />
              <label htmlFor="content">Content:</label>
              <TinyMCEEditor initialValue={post.content} value={edittedPost.content} onChange={handleEditorChange} />
              <div className="published">
                <label htmlFor="published">Published? </label>
                <input type="checkbox" id="published" name="published" checked={edittedPost.published} onChange={handleChange} />
              </div>
              <button type="submit">Edit Post</button>
            </form>
            <button type="button" className="link-btn">
              <Link to="/">Return to homepage</Link>
            </button>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}

export default PostEditor;
