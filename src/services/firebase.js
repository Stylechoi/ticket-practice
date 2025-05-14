import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdDWpGM99-tNEkztUy7ohSEL-5mHYpYqU",
  authDomain: "ticket-practice.firebaseapp.com",
  projectId: "ticket-practice",
  storageBucket: "ticket-practice.firebasestorage.app",
  messagingSenderId: "701042676031",
  appId: "1:701042676031:web:6be40af2064f3be812038a",
  measurementId: "G-ZZ0YEC2FSD"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 