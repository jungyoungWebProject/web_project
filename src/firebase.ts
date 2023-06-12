import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAshBslRfU6Fbhbu025GI9RrUwy7m1bk38",
  authDomain: "web-project-de5e8.firebaseapp.com",
  projectId: "web-project-de5e8",
  storageBucket: "web-project-de5e8.appspot.com",
  messagingSenderId: "161259414294",
  appId: "1:161259414294:web:d960190b77a34f4e8e2637",
  measurementId: "G-5YPSXH24S5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
