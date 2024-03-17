// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrjEFLmWPMcV48n82zAAmjPU2HmqHRYgg",
  authDomain: "agristock-61624.firebaseapp.com",
  projectId: "agristock-61624",
  storageBucket: "agristock-61624.appspot.com",
  messagingSenderId: "482309320847",
  appId: "1:482309320847:web:52ae1f0cfe6b1564d9c0fa",
  measurementId: "G-1KPZDVGDKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDB = getStorage(app);
const auth = getAuth(app)


export { app, imageDB, auth };
// const analytics = getAnalytics(app);