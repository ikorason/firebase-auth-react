import * as firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA4Rzkwl0hr2xOcZ4f1obf2uGro46awXXA',
  authDomain: 'fir-authreact.firebaseapp.com',
  databaseURL: 'https://fir-authreact.firebaseio.com',
  projectId: 'fir-authreact',
  storageBucket: 'fir-authreact.appspot.com',
  messagingSenderId: '864754635251'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()
const auth = firebase.auth()

export { db, auth }
