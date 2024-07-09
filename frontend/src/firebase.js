// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_KAzzwyb4laKdu8vDAa54CR3EAfDquXg",
  authDomain: "devxpert-coding-platform.firebaseapp.com",
  projectId: "devxpert-coding-platform",
  storageBucket: "devxpert-coding-platform.appspot.com",
  messagingSenderId: "1096561017330",
  appId: "1:1096561017330:web:d6e1f2b2ce5cf0a8222b6b",
  measurementId: "G-Q8554GX3XN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
