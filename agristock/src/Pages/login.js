import React, { useState } from 'react';
import '../Styles/login.css'
import Navbar from '../Components/navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
 
  }

  const handleGoogleSignIn = () => {
    console.log("Signing in with Google...");
  }

  return (
  <div>
    <Navbar />
    <h1 className="agristock-heading">AgriStock</h1>
    <div className="background-container"></div>
    <div className="login-container">
        {/* Login form content */}
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button class="google-signin" onClick={handleGoogleSignIn}>Sign in with Google</button>
      <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
    </div>
  </div>
  );
}

export default Login;