import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import auth from "./firebaseconfig";

const provider = new GoogleAuthProvider();


export function handleCreateUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function handleSignInUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function handleSignInWithGoogle() {
    return signInWithPopup(auth, provider);
}

export function handleSignOut() {
    return signOut(auth);
}