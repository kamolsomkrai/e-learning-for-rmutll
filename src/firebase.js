
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8Ts4W9rwkrvQObdCTfgtZyUcuZKJr2tc",
    authDomain: "e-learning-for-rmutl-village.firebaseapp.com",
    databaseURL: "https://e-learning-for-rmutl-village.firebaseio.com",
    projectId: "e-learning-for-rmutl-village",
    storageBucket: "e-learning-for-rmutl-village.appspot.com",
    messagingSenderId: "52886307640",
    appId: "1:52886307640:web:3225a40dc863f4292437cd",
    measurementId: "G-9QX8KFLLEQ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();