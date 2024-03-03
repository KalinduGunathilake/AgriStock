import React, { useState } from 'react';
import '../Styles/login.css'
import backgroundImage from '../Images/logback.jpg';

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
    <h1 className="agristock-heading">AgriStock</h1>
    <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
    <div className="login-container">
        {/* Login form content */}
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button class="login" onClick={handleSubmit}>Login</button>
      </form>
      
      <button class="google-signin" onClick={handleGoogleSignIn}>Sign in with Google</button>
      <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
      <a href="/register-now" className="register-now">Register Now</a>
    </div>
  </div>
  );
}

export default Login;