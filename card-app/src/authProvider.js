import { app } from './firebaseConfig.js'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);