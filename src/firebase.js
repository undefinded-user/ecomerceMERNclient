import * as firebase from 'firebase'


 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBAE9-eHLbtPvzj54_mfEziu_ZcPr3nkvM",
    authDomain: "ecommerce-be5e3.firebaseapp.com",
    databaseURL: "https://ecommerce-be5e3.firebaseio.com",
    projectId: "ecommerce-be5e3",
    storageBucket: "ecommerce-be5e3.appspot.com",
    messagingSenderId: "123783330646",
    appId: "1:123783330646:web:90c05e652fd5ae4a6934f7"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // export 

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()