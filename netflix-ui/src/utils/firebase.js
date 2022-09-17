// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBcc0cTVlrK1gs5GrutM8Yajg-f749H4g",
  authDomain: "mern-netflix-14e47.firebaseapp.com",
  projectId: "mern-netflix-14e47",
  storageBucket: "mern-netflix-14e47.appspot.com",
  messagingSenderId: "946755719815",
  appId: "1:946755719815:web:beb924cbd6aa39cd869e22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDb = getStorage(app);
