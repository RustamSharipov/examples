// https://leerob.io/blog/nextjs-firebase-serverless
import firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
