import { auth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    
  })
  .catch((error) => {
    if (error.code === "auth/wrong-password") {
      alert("Wrong password.");
    } else if (error.code === "auth/email-already-in-use") {
      alert("Email already in use.");
  }})
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  // const result = await signInWithRedirect(auth, provider);
  const user = result.user;

  // const provider = new GoogleAuthProvider();
  // const result = await signInWithRedirect(auth, provider);

  // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // if (isMobile) {
  //   const result = await signInWithRedirect(auth, provider);
  //   const user = result.user;
  // } else {
  //   const result = await signInWithPopup(auth, provider);
  //   const user = result.user;
  // }


  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
