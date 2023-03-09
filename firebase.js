// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDw8jqtw4_iIAVqWrNVcyrWqFvaiHU4Irs",
  authDomain: "laundry-4eb1b.firebaseapp.com",
  projectId: "laundry-4eb1b",
  storageBucket: "laundry-4eb1b.appspot.com",
  messagingSenderId: "459268983959",
  appId: "1:459268983959:web:f09ab3e9605465255cadd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore()

export {auth, db}