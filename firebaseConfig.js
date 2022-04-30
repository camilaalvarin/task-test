import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyAxf99ABpdIRPWCbIjT0wBaxqIgSgRbIhI',
    authDomain: "task-test-34881.firebaseapp.com",
    projectId: "task-test-34881",
    storageBucket: "task-test-34881.appspot.com",
    messagingSenderId: "501336745599",
    appId: "1:501336745599:web:a368cbd500d97b785ac14a",
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

