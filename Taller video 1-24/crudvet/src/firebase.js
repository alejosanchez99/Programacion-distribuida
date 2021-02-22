import firebase from "firebase/app";
import "firebase/firebase-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeFUIKDYOiv_smH-D6KHkka7Kjmg2TgvI",
  authDomain: "crudvet.firebaseapp.com",
  projectId: "crudvet",
  storageBucket: "crudvet.appspot.com",
  messagingSenderId: "181700851357",
  appId: "1:181700851357:web:30fb6fc9a1864b79bbc674"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
