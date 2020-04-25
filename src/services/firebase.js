import * as firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCTZoYRlKWMrSkCDN6WH13w0C_jrlo8QeY",
  authDomain: "carlitos-tuto.firebaseapp.com",
  databaseURL: "https://carlitos-tuto.firebaseio.com",
  projectId: "carlitos-tuto",
  storageBucket: "carlitos-tuto.appspot.com",
  messagingSenderId: "106452173530",
  appId: "1:106452173530:web:5b4009122a62476fc79be3"
});

export const db = app.firestore();
export const auth = app.auth();
