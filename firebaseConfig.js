
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCZ60lak9Cf0y7uhIiHyKlT0zEeseutby8",
  authDomain: "linkdin-clone-cc848.firebaseapp.com",
  projectId: "linkdin-clone-cc848",
  storageBucket: "linkdin-clone-cc848.appspot.com",
  messagingSenderId: "772128976247",
  appId: "1:772128976247:web:69bb5c96fbb3f6b3d7c572",
  measurementId: "G-G8C6S3DPZP"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);