import React, { useState } from 'react';
import '../Styles/login.css';
import backgroundImage from '../Images/logback.jpg';
import { auth } from '../Config/firebaseConfiger';
import { signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { signInWithGoogle } from "../Config/firebaseConfiger";

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
      <h1 className="agristock-heading">AgriStock</h1>
      <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
      <div className="login-container">
        {/* Login form content */}
        <h2>Welcome Back!</h2>
    
        <label htmlFor="email">Email Address:</label>
        <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className="login" onClick={handleLogin}>Login</button>
      
        <div className="container">
          <button className="google-signin" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
        <a href="/register-now" className="register-now">Register Now</a>
 
      </div>
    
    </div>
  );
};

export default Login;
