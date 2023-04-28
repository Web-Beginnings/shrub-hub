import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACnNgUBeXsUuqVjw61yDjv9jqnfRFrQUw",
  authDomain: "your-auth-domain-b1234.firebaseapp.com",
  databaseURL: "https://your-database-name.firebaseio.com",
  projectId: "shrub-hub",
  storageBucket: "your-project-id-1234.appspot.com",
  messagingSenderId: "890051548377",
  appId: "1:890051548377:ios:694b60364fcdb0f90b5ac8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
