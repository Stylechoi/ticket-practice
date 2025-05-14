// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdDWpGM99-tNEkztUy7ohSEL-5mHYpYqU",
  authDomain: "ticket-practice.firebaseapp.com",
  projectId: "ticket-practice",
  storageBucket: "ticket-practice.firebasestorage.app",
  messagingSenderId: "701042676031",
  appId: "1:701042676031:web:6be40af2064f3be812038a",
  measurementId: "G-ZZ0YEC2FSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth }; 