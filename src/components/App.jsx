import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import useFetchPosts from "../hooks/useFetchPosts";
import formatDate from "../formatDate";
import Comments from "./Comments";
import useDeletePost from "../hooks/useDeletePost";
import { useEffect, useState } from "react";
import sanitizeContent from "../sanitizeHtml";

function App() {
  const { userData, logout } = useAuth();
  const { posts, loading, error } = useFetchPosts(userData);
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const [postsState, setPostsState] = useState({
    id: null,
    title: "",
    content: "",
    date: "",
    userId: null,
    published: null,
    author: "",
  });
  const { deletePost } = useDeletePost();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (sortedPosts) {
      setPostsState(sortedPosts);
    }
  }, [sortedPosts]);

  async function handleDelete(e, postId) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this comment?")) {
      await deletePost(postId);
      setPostsState((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      alert("Post deleted successfully!");
    }
  }

  return (
    <>
      <header>
        <h1>Blog Dashboard</h1>
        {userData ? (
          <div>
            <button onClick={logout}>Log out!</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Log In here!</Link>
          </div>
        )}
      </header>
      {userData ? (
        loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Oops... something happened: {error.message}</h1>
        ) : (
          <div className="posts">
            <h1>Posts</h1>
            <ul>
              {postsState.map((post) => (
                <li key={post.id}>
                  <div>
                    <h1>Published? {post.published ? <>Yes</> : <>No</>}</h1>
                    <h2>Title: {post.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }} />
                    <p>Date: {formatDate(post.date)}</p>
                    <p>By: {post.author}</p>
                    <div className="buttons">
                      <Link
                        to={{
                          pathname: `/editpost/${post.id}`,
                        }}
                      >
                        <button>Edit this post</button>
                      </Link>
                      <button onClick={(e) => handleDelete(e, post.id)}>Delete this post</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="create-post">
              <Link to="/createpost">Create posts here!</Link>
            </button>
          </div>
        )
      ) : (
        <></>
      )}
      {userData && (
        <div className="comments">
          <h1>All comments</h1>
          <Comments />
        </div>
      )}
      <Outlet />
    </>
  );
}

export default App;

{
  /* <label htmlFor="published">Published? </label>
<input type="checkbox" checked={post.published} onChange={(e) => handlePublishing(e.target.checked)} /> */
}
