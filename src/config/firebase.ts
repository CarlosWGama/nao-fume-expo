import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDiAoLFZay6ItQEqbsvOwBMa9IxV6ON8Zo",
    authDomain: "naofumev2.firebaseapp.com",
    databaseURL: "https://naofumev2-default-rtdb.firebaseio.com",
    projectId: "naofumev2",
    storageBucket: "naofumev2.firebasestorage.app",
    messagingSenderId: "324989638432",
    appId: "1:324989638432:web:4415afc091c47dfa8e6945"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}


export const firestore = app.firestore();
export const auth = app.auth();