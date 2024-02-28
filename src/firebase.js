// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLn-W_vorUFdiBQ9o9XEVqHjmRg-yt0XA",
  authDomain: "cyevents-b4bea.firebaseapp.com",
  projectId: "cyevents-b4bea",
  storageBucket: "cyevents-b4bea.appspot.com",
  messagingSenderId: "258779964530",
  appId: "1:258779964530:web:9d0accaaf5f35288cdceeb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export default app;