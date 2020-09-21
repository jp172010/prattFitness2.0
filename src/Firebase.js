import firebase from 'firebase'
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDQMAD9WkDZXvBvWmVHico0wvgGAFr35Wc",
    authDomain: "brutusbuilt.firebaseapp.com",
    databaseURL: "https://brutusbuilt.firebaseio.com",
    projectId: "brutusbuilt",
    storageBucket: "brutusbuilt.appspot.com",
    messagingSenderId: "541731456902",
    appId: "1:541731456902:web:b19e2087b86f44d2668e07",
    measurementId: "G-G5FZ4S5HPH"
};
firebase.initializeApp(config);

export default firebase;