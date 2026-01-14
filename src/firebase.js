import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  databaseURL: "https://bookstore-v-default-rtdb.europe-west1.firebasedatabase.app"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
export default database;
