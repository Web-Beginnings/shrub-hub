// import * as firebase from "firebase";
// import "@firebase/auth";
// import "@firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACnNgUBeXsUuqVjw61yDjv9jqnfRFrQUw",
  authDomain: "shrub-hub.firebaseapp.com",
  projectId: "shrub-hub",
  storageBucket: "shrub-hub.appspot.com",
  messagingSenderId: "890051548377",
  appId: "1:890051548377:web:0ac68cb8c596d8890b5ac8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
export { db, auth };
