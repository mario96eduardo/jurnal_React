import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDDeOY_5i1u_InTzEtZseMfnLlwFgQdaGk",
    authDomain: "react-app-cursos-cc651.firebaseapp.com",
    projectId: "react-app-cursos-cc651",
    storageBucket: "react-app-cursos-cc651.appspot.com",
    messagingSenderId: "382984030806",
    appId: "1:382984030806:web:f6bbf8a561dac5b83809f7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);
//         or
//const db = getFirestore();
const googleAuthProveder = new GoogleAuthProvider();
// const googleAuthProveder = new  firebase.auth.googleAuthProveder();

const auth = getAuth();
export {
    db,
    googleAuthProveder,
    auth, signInWithPopup, doc, setDoc

}