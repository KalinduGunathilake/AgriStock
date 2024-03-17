import React, { useState } from 'react';
import '../Styles/login.css';
import backgroundImage from '../Images/logback.jpg';
import { auth } from '../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User is signed in: " + user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    console.log("Signing in with Google...");
  };

  return (
    <div>
      <h1 className="agristock-heading">AgriStock</h1>
      <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
      <div className="login-container">
        {/* Login form content */}
        <h2>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="login" onClick={handleLogin}>Login</button>
        </form>
      
        <button className="google-signin" onClick={handleGoogleSignIn}>Sign in with Google</button>
        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
        <a href="/register-now" className="register-now">Register Now</a>
      </div>
    </div>
  );
};

export default Login;
