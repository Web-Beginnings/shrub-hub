// import * as firebase from "firebase";
// import "@firebase/auth";
// import "@firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyACnNgUBeXsUuqVjw61yDjv9jqnfRFrQUw",
//   authDomain: "shrub-hub.firebaseapp.com",
//   projectId: "shrub-hub",
//   storageBucket: "shrub-hub.appspot.com",
//   messagingSenderId: "890051548377",
//   appId: "1:890051548377:web:0ac68cb8c596d8890b5ac8",
// };



// const firebaseConfig = {
//   apiKey: "AIzaSyBwZW02R8EW4Nw8cpGc47lriUd3YBaohLw",
//   authDomain: "shrub-hub-2.firebaseapp.com",
//   projectId: "shrub-hub-2",
//   storageBucket: "shrub-hub-2.appspot.com",
//   messagingSenderId: "726087563354",
//   appId: "1:726087563354:web:b6191cdaa3d4c6f7284063",
// };


const firebaseConfig = {
  apiKey: "AIzaSyCykvz66Nvsju2sayxww_QiHD27QDSlZxc",
  authDomain: "shrub-hub-3.firebaseapp.com",
  projectId: "shrub-hub-3",
  storageBucket: "shrub-hub-3.appspot.com",
  messagingSenderId: "716420825854",
  appId: "1:716420825854:web:74276a1172ddabc2dc1baf",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
export { firebase };
