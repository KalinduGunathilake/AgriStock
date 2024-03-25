import React, { useEffect, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../Firebase/auth'
import { useAuth } from '../Context/AuthContext/authContext'
import backendURL from '../Config/backendURL'
import '../Styles/login.css';
import backgroundImage from '../Images/logback.jpg';

const Login = () => {

   

    const { userLoggedIn } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser } = useAuth()

    useEffect(() => {
        if (userLoggedIn) {
            // setUseruid(currentUser.uid)
            // console.log(useruid)
            // console.log(currentUser)
            console.log(currentUser.uid)
            checkUserExists(currentUser.uid)
            // console.log(userLoggedIn)
            // sendDetailsToMongoDB(currentUser)
        }
    }, [currentUser])

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
            doSignInWithGoogle()
                .then(() => {
                    console.log("came to then")
                    // checkUserExists()
                })
                .catch(err => {
                    setIsSigningIn(false)
                    console.log("did not pass" + err)
                })
        }

        //send details to mongodb
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
                    sendDetailsToMongoDB().then(() => {
                        navigate('/additionalInfo', { state: { from: '/additionalInfo' } })
                    })
                    // navigate('/home')
                } else {
                    console.log("user already exists")
                    navigate('/home')
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
                body: JSON.stringify({ firebaseID: currentUser.uid, name: currentUser.displayName, harvests: [], role: '', profilepic: '' }),
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
            {errorMessage && (<span className='Errormg'>{errorMessage}</span>)}
            <button type="submit"disabled={isSigningIn} className={`login ${isSigningIn ? 'TT' : 'FF'}`} >{isSigningIn ? 'Signing In...' : 'Login'} </button>
            
            <div className="sign-in-container">
            <button disabled={isSigningIn} onClick={(e) => { onGoogleSignIn(e) }}className={`google-signin ${isSigningIn ? 'Tt' : 'Ff'}`}>
             {isSigningIn ? 'Signing In...' : 'Sign in with Google'}</button>
            </div>
            <p className="text">Don't have an account? <a href="/register-now" className="register-now"> Register Now</a></p>
            </form>
            </div>      
       
        </div>
    )
}

export default Login
