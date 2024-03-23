import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../Firebase/auth'
import { useAuth } from '../Context/AuthContext/authContext'
import backendURL from '../Config/backendURL'
import '../Styles/login.css';
import backgroundImage from '../Images/logback.jpg';

const Login = () => {
    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
            // doSendEmailVerification()
        }
        
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }

    }
    const checkUserExists = (uid) => {
        console.log(uid)
        fetch(backendURL + `/checkuser?firebaseID=${uid}`)
            .then(response =>
                response.json()
            )
            .then(exists => {
                // console.log(data)
                if (!exists) {
                    sendDetailsToMongoDB()
                    // navigate('/home')
                } else {
                    console.log("user already exists")
                }
            })
            .catch(err =>
                console.log(err)
            )
    }

    const sendDetailsToMongoDB = async () => {

        try {
            await fetch(backendURL + '/createUser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firebaseID: currentUser.uid, name: '', harvests: [], role: '', profilepic: '' }),
              })
              .then((response) => {
                console.log("success:", response.ok);
              })

        } catch (error) {
            console.error(error);
        }
    }

    return (
        
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <h1 className="cr-agristock-heading">AgriStock</h1>
            <div className="log-background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
            
            <div className="login-container">
            {/* Login form content */}
            <h2 className='log-head'>Welcome Back!</h2>

            <form onSubmit={onSubmit}className="space-y-5">

            <label htmlFor="email"className='logleb'> Email Address:</label>
            <input type="email" autoComplete='email'  className ="log-in" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="password"className='logleb'>Password:</label>
            <input type="password"autoComplete='current-password'  className ="log-in" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
            {errorMessage && (<span className='text-red-600 font-bold'>{errorMessage}</span>)}
            <button type="submit"disabled={isSigningIn} className={`login ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`} >{isSigningIn ? 'Signing In...' : 'Login'} </button>
            
            <div className="sign-in-container">
            <button disabled={isSigningIn} onClick={(e) => { onGoogleSignIn(e) }}className={`google-signin ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}>
             {isSigningIn ? 'Signing In...' : 'Sign in with Google'}</button>
            </div>
            <p className="text">Don't have an account? <a href="/register-now" className="register-now"> Register Now</a></p>
            </form>
            </div>      
       
        </div>
    )
}

export default Login