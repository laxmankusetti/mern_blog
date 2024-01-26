
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-12631.firebaseapp.com",
  projectId: "mern-blog-12631",
  storageBucket: "mern-blog-12631.appspot.com",
  messagingSenderId: "61623411256",
  appId: "1:61623411256:web:05a3b138cc47482fb4fccd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);