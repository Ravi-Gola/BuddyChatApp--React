// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK8T5YZ9f3g0f5L0GUTON-bsKKmc9CpbE",
  authDomain: "buddychatapp-3d6f1.firebaseapp.com",
  projectId: "buddychatapp-3d6f1",
  storageBucket: "buddychatapp-3d6f1.appspot.com",
  messagingSenderId: "10583995693",
  appId: "1:10583995693:web:3b7c5c108151a36d578fa4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db= getFirestore();
export const storage = getStorage();