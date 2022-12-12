// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries Your web app's
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcccS2DLCjlL2pspEk3hv6fY6TzmR6y7s",
    authDomain: "todo-app-2e266.firebaseapp.com",
    projectId: "todo-app-2e266",
    storageBucket: "todo-app-2e266.appspot.com",
    messagingSenderId: "825384951620",
    appId: "1:825384951620:web:5a012dd8b2d3833f324111"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export let db = getFirestore(app);
