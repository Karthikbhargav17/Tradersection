// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import firebase from 'firebase/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyC66_CU411BhbR0-HGkPRh3rAW0kjxBKl8",
  authDomain: "krishi-8dcf5.firebaseapp.com",
  projectId: "krishi-8dcf5",
  storageBucket: "krishi-8dcf5.appspot.com",
  messagingSenderId: "68394843397",
  appId: "1:68394843397:web:8491e3abaad2cbee0ccb6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default {db,firebase};