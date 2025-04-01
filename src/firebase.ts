import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDTD2sqzGscXzXW53eAIrLB5QljX8Z9mKI",
  authDomain: "docuai-23797.firebaseapp.com",
  projectId: "docuai-23797",
  storageBucket: "docuai-23797.firebasestorage.app",
  messagingSenderId: "655355723418",
  appId: "1:655355723418:web:ea8da4b21770154defe923",
  measurementId: "G-ELD396ZTFM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});