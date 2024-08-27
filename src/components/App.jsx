import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import useFetchPosts from "../hooks/useFetchPosts";
import formatDate from "../formatDate";

function App() {
  const { userData, logout } = useAuth();
  const { posts, loading, error } = useFetchPosts();

  return (
    <>
      <header>
        <h1>Blog Dashboard</h1>
        {userData ? (
          <div>
            <h1>Welcome back! {userData.username}</h1>
            <button onClick={logout}>Log out!</button>
            <Link to="/createpost">Create posts here!</Link>
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
              {posts.map((post) => (
                <li key={post.id}>
                  <div>
                    <h1>Published? {post.published ? <>Yes</> : <>No</>}</h1>
                    <h2>Title: {post.title}</h2>
                    <p>Content: {post.content}</p>
                    <p>Date: {formatDate(post.date)}</p>
                    <p>By: {post.author}</p>
                    <Link
                      to={{
                        pathname: `/editpost/${post.id}`,
                      }}
                    >
                      <button>Edit this post</button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <h1>
          No posts available. Try <Link to="/login">logging in</Link> or <Link to="/register">creating an account</Link>
        </h1>
      )}
      <h1>All comments</h1>
      <Outlet />
    </>
  );
}

export default App;

{
  /* <label htmlFor="published">Published? </label>
<input type="checkbox" checked={post.published} onChange={(e) => handlePublishing(e.target.checked)} /> */
}
