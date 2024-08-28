import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import Login from "./Login";
import PostEditor from "./PostEditor";
import PostCreator from "./PostCreator";
import CommentEditor from "./CommentEditor";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [{ path: "login", element: <Login /> }],
      errorElement: <ErrorPage />,
    },
    {
      path: "/editpost/:postId",
      element: <PostEditor />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/editcomment/:commentId",
      element: <CommentEditor />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/createpost",
      element: <PostCreator />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
