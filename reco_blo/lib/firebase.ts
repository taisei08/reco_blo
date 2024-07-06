// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJw-c_qtVY6SlOxEGiuJey4wRVHug8XH8",
  authDomain: "recoblo.firebaseapp.com",
  projectId: "recoblo",
  storageBucket: "recoblo.appspot.com",
  messagingSenderId: "747530939958",
  appId: "1:747530939958:web:992b3f931de51ad1f9b297",
  measurementId: "G-SYRZG7V6GY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
