
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChVVLrilU9X__5kuk6PAl1PIQcYRkUGwM",
  authDomain: "apuestas-e158f.firebaseapp.com",
  projectId: "apuestas-e158f",
  storageBucket: "apuestas-e158f.appspot.com",
  messagingSenderId: "227671574542",
  appId: "1:227671574542:web:7e8ae85cf463ed6512d45f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth }