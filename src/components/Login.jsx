import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const { message, login, userData } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // if (error) return <div>Oops, something happened. {error.message}</div>;

  if (userData) {
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await login(username, password);

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
      {message && <h1>{message}</h1>}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
}

export default Login;
