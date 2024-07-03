// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyCSJC5jqnaTzosu7MXulAU9KHMAldqewps",
  authDomain: "real-esatate-b17dd.firebaseapp.com",
  projectId: "real-esatate-b17dd",
  storageBucket: "real-esatate-b17dd.appspot.com",
  messagingSenderId: "671931442973",
  appId: "1:671931442973:web:ed08aef5fc6e2ee8eb63f4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
