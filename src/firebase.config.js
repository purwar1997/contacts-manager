import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'contacts-manager-dba7f.firebaseapp.com',
  projectId: 'contacts-manager-dba7f',
  storageBucket: 'contacts-manager-dba7f.appspot.com',
  messagingSenderId: '753006666907',
  appId: '1:753006666907:web:064a91522c41768ebb923e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
