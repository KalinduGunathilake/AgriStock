
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGh6f2FUb9svfhWkFbTo6F5av5R-TLQp0",
  authDomain: "agristock-e4b44.firebaseapp.com",
  projectId: "agristock-e4b44",
  storageBucket: "agristock-e4b44.appspot.com",
  messagingSenderId: "1026020328957",
  appId: "1:1026020328957:web:32c9d3ec94632a5ccd4594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};