// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXSoV4Iyk0cmVI3CSHMm9TKqF0VD2JZn4",
  authDomain: "teamflowxr.firebaseapp.com",
  projectId: "teamflowxr",
  storageBucket: "teamflowxr.firebasestorage.app",
  messagingSenderId: "248638990386",
  appId: "1:248638990386:web:b8d9f3460ba719661f742b",
  measurementId: "G-4MNY1S0TK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);