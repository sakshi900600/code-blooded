import React, { useState } from "react";
import "./Login.css"; // We'll style it separately

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Handle login logic or API call
    console.log("Logging in:", username, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="top-bar">
          <a href="/">Home</a>
        </div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>User Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
