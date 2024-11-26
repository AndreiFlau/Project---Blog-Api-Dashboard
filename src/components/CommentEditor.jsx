import { useEffect, useState } from "react";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import useCommentEditing from "../hooks/useCommentEditing";
import useFetchOneComment from "../hooks/useFetchOneComment";

function CommentEditor() {
  const { error, editComment } = useCommentEditing();
  const navigate = useNavigate();
  const { comment, loading } = useFetchOneComment();
  const [edittedComment, setEdittedComment] = useState("");

  // if (error) return <div>Oops, something happened. {error.message}</div>;

  useEffect(() => {
    if (comment) {
      setEdittedComment(comment.content);
    }
  }, [comment]);

  async function handleEditing(e) {
    e.preventDefault();
    await editComment(edittedComment, comment.id);
    if (!error) {
      alert("Comment edited successfully.");
      navigate("/");
    }
  }

  return (
    <>
      <div className="comment-creator">
        <h1>Edit your comment</h1>
        {error && <h1>{error.message}</h1>}
        {!loading ? (
          <div className="post">
            <form onSubmit={handleEditing}>
              <textarea
                type="text"
                id="content"
                name="content"
                value={edittedComment}
                onChange={(e) => setEdittedComment(e.target.value)}
                required
              ></textarea>
              <button type="submit">Edit Comment</button>
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

export default CommentEditor;
