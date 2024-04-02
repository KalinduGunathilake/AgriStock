import React, { useEffect, useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext/authContext';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../Firebase/auth';
import backgroundImage from '../Images/back.jpg';
import backendURL from '../Config/backendURL';
import AdditionalInfo from '../Components/AdditionalInfo';
import '../Styles/register.css';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLoggedIn, currentUser } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [useruid, setUseruid] = useState('');

    useEffect(() => {
        if (userLoggedIn) {
            setUseruid(currentUser.uid);
            checkUserExists(currentUser.uid);
        }
    }, [currentUser]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            // Check if password and confirmPassword match
            if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match.');
                setIsRegistering(false);
                return;
            }

            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                if (error.code === 'auth/wrong-password') {
                    setErrorMessage('Wrong password.');
                } else if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('Email already in use.');
                } else {
                    console.log(error);
                }
            } finally {
                setIsRegistering(false);
            }
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle()
                .then(() => {
                    // checkUserExists();
                })
                .catch((err) => {
                    setIsSigningIn(false);
                    console.log('Google Signin Error: ', err);
                });
        }
    };

    const checkUserExists = (uid) => {
        fetch(backendURL + `/checkuser?firebaseID=${uid}`)
            .then((response) => response.json())
            .then((exists) => {
                if (!exists) {
                    sendDetailsToMongoDB();
                    navigate('/additionalInfo');
                } else {
                    console.log('User already exists');
                }
            })
            .catch((err) => console.log(err));
    };

    const sendDetailsToMongoDB = async () => {
        try {
            await fetch(backendURL + '/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firebaseID: currentUser.uid, name: '', harvests: [], role: '', profilepic: '' }),
            }).then((response) => {
                console.log('Success:', response.ok);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to="/home" replace />}
            <div>
                <h1 className="cr-agristock-heading">AgriStock</h1>
                <div
                    className="cr-background-container"
                    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
                ></div>
                <div className="cr-create-container">
                    <h2 className="create-head">Create Account</h2>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <label htmlFor="email" className="cr">
                            Email Address:
                        </label>
                        <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="cri" />
                        <label htmlFor="password" className="cr">
                            Password:
                        </label>
                        <input disabled={isRegistering} type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="cri" />
                        <label htmlFor="confirmpassword" className="cr">
                            Confirm Password:
                        </label>
                        <input disabled={isRegistering} type="password" autoComplete="off" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="cri" />
                        {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
                        <button type="submit" disabled={isRegistering} className={`signup ${isRegistering ? 'TT' : 'FF'}`}>
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="re-sign-in-container">
                            <button disabled={isSigningIn} onClick={onGoogleSignIn} className={`re-google-signin ${isSigningIn ? 'Tt' : 'Ff'}`}>
                                {isSigningIn ? 'Signing...' : 'Continue with Google'}
                            </button>
                        </div>
                        <p className="re-text">
                            Already have an account?<a href="/login" className="login-link"> Sign-in </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
