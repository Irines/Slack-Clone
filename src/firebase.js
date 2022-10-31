// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqwhAYmgQHoka2eyD78N9_m-TIjUbQFf4",
  authDomain: "slack-app-clone-5f423.firebaseapp.com",
  projectId: "slack-app-clone-5f423",
  storageBucket: "slack-app-clone-5f423.appspot.com",
  messagingSenderId: "380852420802",
  appId: "1:380852420802:web:9da43c7340c7519a143b5b"
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// // const db = firebaseApp.firestore();

const firebaseApp = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};