// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFWIGLOOjs-mTucfvWEMIWiqk9tiOiQk4",
  authDomain: "tuledata-83686.firebaseapp.com",
  projectId: "tuledata-83686",
  storageBucket: "tuledata-83686.appspot.com",
  messagingSenderId: "258862887522",
  appId: "1:258862887522:web:45838a4dd1a8695c58973b",
  measurementId: "G-F3HE25XTKN",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database(); // Get the database reference

export { firebase, database };
