// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgZVbWDv6iXmBXr4WfaGD7XAO2bft37Rk",
  authDomain: "rotlqkf-79939.firebaseapp.com",
  projectId: "rotlqkf-79939",
  storageBucket: "rotlqkf-79939.appspot.com",
  messagingSenderId: "16934792562",
  appId: "1:16934792562:web:4e5edfdbf40bad6f9841eb",
  measurementId: "G-GV3MNGFL0P",
  databaseUrl:
    "https://fir-98e02-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
