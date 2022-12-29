import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
const envFile = process.env
const firebaseConfig = {
  apiKey: envFile.REACT_APP_FIREBASE_API_KEY,
  authDomain: envFile.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: envFile.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: envFile.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envFile.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: envFile.REACT_APP_FIREBASE_APP_KEY
}
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app, envFile.REACT_APP_FIREBASE_BUCKET_URL)
export default firebaseStorage