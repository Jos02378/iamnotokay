import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyDM4I8SP50frLAHjYH2JXDOaW79IGnHl6Q',
  authDomain: 'iamnotokay-af27e.firebaseapp.com',
  projectId: 'iamnotokay-af27e',
  storageBucket: 'iamnotokay-af27e.appspot.com',
  messagingSenderId: '27146076270',
  appId: '1:27146076270:web:6e65d3bdc3dbf3e911e67f',
};

const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue, FieldPath } = Firebase.firestore;

export { firebase, FieldValue, FieldPath };
