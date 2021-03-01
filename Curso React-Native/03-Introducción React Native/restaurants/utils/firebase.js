import firebase from "firebase/app";
import "firebase/firebase-storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1chNovDiEripzdUPOL_Iey3K4RdV5DAQ",
    authDomain: "restaurants-edc9f.firebaseapp.com",
    projectId: "restaurants-edc9f",
    storageBucket: "restaurants-edc9f.appspot.com",
    messagingSenderId: "290856749256",
    appId: "1:290856749256:web:c466131e19c28be5a5fdfd"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);