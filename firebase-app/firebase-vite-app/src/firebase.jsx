import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEJV7OAtniBpbfwKC-v9Tm0-lGkXH77O0",
  authDomain: "project-1-79b09.firebaseapp.com",
  databaseURL: "https://project-1-79b09-default-rtdb.firebaseio.com",
  projectId: "project-1-79b09",
  storageBucket: "project-1-79b09.firebasestorage.app",
  messagingSenderId: "787308866918",
  appId: "1:787308866918:web:37874265d35e852552eca7"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };