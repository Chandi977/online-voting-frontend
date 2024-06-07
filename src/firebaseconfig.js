// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1m-SSNnYyu23-M2PDzxAer3WdRpoQHvo",
  authDomain: "online-voting-system-87fe0.firebaseapp.com",
  projectId: "online-voting-system-87fe0",
  storageBucket: "online-voting-system-87fe0.appspot.com",
  messagingSenderId: "52228102739",
  appId: "1:52228102739:web:1a56c7602c772d6826c4a6",
  measurementId: "G-13TYMNH66T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
