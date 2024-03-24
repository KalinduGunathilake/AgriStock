import React, { useEffect, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext/authContext'
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../Firebase/auth'
import { auth } from '../Firebase/config'
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import backendURL from '../Config/backendURL'
import AdditionalInfo from '../Components/AdditionalInfo'
import '../Styles/register.css';
import backgroundImage from '../Images/back.jpg';

const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage,] = useState('')
    const { userLoggedIn } = useAuth()
    const { currentUser } = useAuth()
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [useruid, setUseruid] = useState('')
   
   
    useEffect(() => {
        if (userLoggedIn) {
            setUseruid(currentUser.uid)
            console.log(currentUser.uid)
            checkUserExists(currentUser.uid)
    
        }
    }, [currentUser])


    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password).then(() => {})  
            .catch((error) => {
                    if (error.code === "auth/wrong-password") {
                        alert("Wrong password.");
                    } else if (error.code === "auth/email-already-in-use") {
                        alert("Email already in use.");
                      
                    } else {
                        console.log(error)
                    }
                })       
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
    
    }
    const checkUserExists = (uid) => {
        console.log(uid)
        fetch(backendURL + `/checkuser?firebaseID=${uid}`)
            .then(response =>
                response.json()
            )
            .then(exists => {
                if (!exists) {
                    sendDetailsToMongoDB()
                    navigate('/additionalInfo')
                } else {
                    console.log("user already exists")
                }
            })
            .catch(err =>
                console.log(err)
            )
    }

    const sendDetailsToMongoDB = async (currentUserNew) => {
        console.log("ready to send details to mongodb")
        console.log(userLoggedIn)
        console.log(currentUser.uid)

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

    return (     <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}           
                
         <div>
                        <h1 className="cr-agristock-heading">AgriStock</h1>
                        <div className="cr-background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <div className="cr-create-container">
                        <h2 className='create-head'>Create Account</h2>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4">
                       <label htmlFor="email" className='cr'>Email Address:</label>
                       <input type="email"autoComplete='email'required value={email} onChange={(e) => { setEmail(e.target.value) }} className='cri' />
                       <label htmlFor="password"className='cr'>Password:</label>
                       <input disabled={isRegistering}type="password"autoComplete='new-password'required value={password} onChange={(e) => { setPassword(e.target.value) }}className='cri'/>
                       <label htmlFor="confirmpassword"className='cr'>Confirm Password:</label>
                       <input disabled={isRegistering} type="password"autoComplete='off'required value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}className='cri'/>
                        {errorMessage && (<span className='text-red-600 font-bold'>{errorMessage}</span>)}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`signup ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}>
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="re-sign-in-container">
                            <button disabled={isSigningIn} onClick={(e) => { onGoogleSignIn(e) }} className={`re-google-signin ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}>{isSigningIn ? 'Signing In...' : 'Continue with Google'}</button>
                        </div>
                        <p className="re-text"> Already have an account?<a href=" /login" className= "login-link"> Sign-in </a></p>
                    </form>
                </div>   
         </div>
        </>
    )
}

export default Register