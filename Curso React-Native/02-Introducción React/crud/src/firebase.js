import firebase from "firebase/app";
import "firebase/firebase-storage";

const firebaseConfig = {
  apiKey: "AIzaSyApVdYFhJh-zHkmPdCBqda9R76wJgZFhRU",
  authDomain: "crud-515bc.firebaseapp.com",
  projectId: "crud-515bc",
  storageBucket: "crud-515bc.appspot.com",
  messagingSenderId: "749785073616",
  appId: "1:749785073616:web:168bf78121bdbd90e79bd5",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
