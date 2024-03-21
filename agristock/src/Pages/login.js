import React, { useState } from 'react';
import '../Styles/login.css';
import backgroundImage from '../Images/logback.jpg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth,signInWithGoogle } from "../Config/firebaseConfiger";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      console.log("Login successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="log-agristock-heading">AgriStock</h1>
      <div className="log-background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
      <div className="login-container">
        {/* Login form content */}
        <h2 className='log-head'>Welcome Back!</h2>
    
        <label htmlFor="email"className='logleb'> Email Address:</label>
        <input type="text" className ="log-in" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="password"className='logleb'>Password:</label>
        <input type="password"className ="log-in" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className="login" onClick={handleLogin}>Login</button>
      
        <div className="sign-in-container">
          <button className="google-signin" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
        <a href="/register-now" className="register-now">Register Now</a>
 
      </div>
    
    </div>
  );
};

export default Login;
