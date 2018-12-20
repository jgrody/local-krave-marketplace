import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBqPvHgZnDuVhozF_RI_1fgLsaSSfjA0AE",
  authDomain: "localkrave-bb8e4.firebaseapp.com",
  databaseURL: "https://localkrave-bb8e4.firebaseio.com",
  projectId: "localkrave-bb8e4",
  storageBucket: "localkrave-bb8e4.appspot.com",
  messagingSenderId: "538744618551"
})
export const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export const storage = firebase.storage().ref();

export const PRODUCTS_COLLECTION = db.collection("products");
export const INVITES_COLLECTION = db.collection("invites");