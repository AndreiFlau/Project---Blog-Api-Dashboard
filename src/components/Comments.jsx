import { useEffect, useState } from "react";
import formatDate from "../formatDate";
import useDeleteComment from "../hooks/useDeleteComment";
import useFetchComments from "../hooks/useFetchComments";
import { Link } from "react-router-dom";

function Comments() {
  const { comments, error, loading } = useFetchComments();
  const [commentState, setCommentState] = useState({
    id: null,
    content: "",
    date: "",
    userId: null,
    postId: null,
    author: "",
  });
  const { deleteComment } = useDeleteComment();

  useEffect(() => {
    if (comments) {
      setCommentState(comments);
    }
  }, [comments]);

  async function handleDelete(e, commentId) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(commentId);
      setCommentState((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      alert("Comment deleted successfully!");
    }
  }

  if (loading) {
    return (
      <div>
        <h4>Loading comments...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h4>Oops... couldn&apos;t fetch the comments: {error.message}</h4>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div>
        <h1>There are no comments</h1>
      </div>
    );
  }

  return (
    <>
      <div className="comments">
        <h4>Comments</h4>
        {!loading && (
          <ul>
            {commentState.map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <p>On: {formatDate(comment.date)}</p>
                <p>By: {comment.author}</p>
                <Link
                  to={{
                    pathname: `/editcomment/${comment.id}`,
                  }}
                >
                  <button>Edit this comment</button>
                </Link>
                <button onClick={(e) => handleDelete(e, comment.id)}>Delete this comment</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Comments;
