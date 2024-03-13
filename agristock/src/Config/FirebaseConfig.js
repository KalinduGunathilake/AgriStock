// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA0DiPOxlc89C3yPnS6s9ZbNrMbXBVNX-c",
  authDomain: "agristock-85006.firebaseapp.com",
  projectId: "agristock-85006",
  storageBucket: "agristock-85006.appspot.com",
  messagingSenderId: "1079553114483",
  appId: "1:1079553114483:web:87af50ef9ad1d0b0eb4506",
  measurementId: "G-DJQNKM01NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);