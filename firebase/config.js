import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC66_CU411BhbR0-HGkPRh3rAW0kjxBKl8",
  authDomain: "krishi-8dcf5.firebaseapp.com",
  projectId: "krishi-8dcf5",
  storageBucket: "krishi-8dcf5.appspot.com",
  messagingSenderId: "68394843397",
  appId: "1:68394843397:web:8491e3abaad2cbee0ccb6c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    //firebase.firestore().enablePersistence();
}
const storageRef = firebase.storage();


export { firebase,storageRef };
