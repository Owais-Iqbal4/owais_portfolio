import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect  } from "firebase/auth";
import { getFirestore, collection, serverTimestamp, onSnapshot, addDoc, doc, orderBy, query } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg8gSvOjJsr44nl8YPRyWQdU7_ZHYFJyc",
  authDomain: "slack-clone-2fcbd.firebaseapp.com",
  projectId: "slack-clone-2fcbd",
  storageBucket: "slack-clone-2fcbd.appspot.com",
  messagingSenderId: "806048703216",
  appId: "1:806048703216:web:799007ca33eefc25569835"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

async function ChannelName(name) {
  const docRef = await addDoc(collection(db, "rooms"), {
    name: name,
  });
}

export { auth, signInWithRedirect , provider, db, serverTimestamp, addDoc, orderBy, query, doc, collection, onSnapshot, ChannelName }
