import React, { useState } from 'react';
import '../Styles/create.css';
import backgroundImage from '../Images/back.jpg';
import { auth } from '../Config/firebaseConfiger';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Create = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user + "Login Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="cr-agristock-heading">AgriStock</h1>
      <div className="cr-background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
      <div className="cr-create-container">
        {/* Create form content */}
        <h2 className='create-head'>Create Account</h2>
        <div className="cr-radio-container">
          <label className='cr'>Farmer:
            <input type="radio" className='cri'  name="accountType" value="farmer" />
          </label>
          <label className='cr'>Buyer:
            <input type="radio"className='cri' name="accountType" value="buyer" />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className='cr'>Name:</label>
          <input type="text" id="name" className='cri' value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="email" className='cr'>Email Address:</label>
          <input type="email" id="email" className='cri' value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="number"className='cr'>Contact Number:</label>
          <input type="text" id="number"className='cri' value={number} onChange={(e) => setNumber(e.target.value)} required />
          <label htmlFor="password"className='cr'>Password:</label>
          <input type="password" id="password" className='cri'value={password} onChange={(event) => setPassword(event.target.value)} />
          <label htmlFor="confirmpassword"className='cr'>Confirm Password:</label>
          <input type="password" id="confirmpassword"className='cri' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button className="signup" onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
