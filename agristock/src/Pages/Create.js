import React, { useState } from 'react';
import '../Styles/create.css'
import backgroundImage from '../images/back.jpg';

const Create = () => {
    const [fristname, setFristname] = useState('');
    const [lastname, setLastname] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
     
      }
      const handleSignUp = () => {
        console.log();
      }
return(
<div>
    <h1 className="agristock-heading">AgriStock</h1>
    <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
    <div className="create-container">
         {/* Create form content */}
        <h2>Create Account</h2>
  <div className="radio-container">
    <label> Farmer:
        <input type="radio" name="accountType" value="farmer" />
    </label>
    <label> Buyer:
        <input type="radio" name="accountType" value="buyer" />
    </label>
  </div>

        <form onSubmit={handleSubmit}>
  <div className="name-container">
    <div className="input-container">
        <label htmlFor="fristname">First Name:</label>
        <input type="text" id="fristname" value={fristname} onChange={(e) => setFristname(e.target.value)} required />
    </div>
    <div className="input-container">
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
    </div>
  </div>

        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="number">Contact Number:</label>
        <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input type="password" id="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </form>
      <button class="signup" onClick={handleSignUp}>Sign Up</button>

    </div>
</div>
);
}
export default Create; 