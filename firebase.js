// Import the functions you need from the SDKs you need
import { initializeApp ,getApp, getApps} from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBYT7xszaIpmyqtCDhS00JgltFnbfDRRY",
  authDomain: "marathi-status-app-ce698.firebaseapp.com",
  projectId: "marathi-status-app-ce698",
  storageBucket: "marathi-status-app-ce698.appspot.com",
  messagingSenderId: "296295097069",
  appId: "1:296295097069:web:856ed3eaabfbf2b21262e4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export default { app,db,storage };