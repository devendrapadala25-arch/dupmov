import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from 'firebase/auth';
import { 
    addDoc, 
    collection, 
    getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDeoV0BlTxEgMBFsw0Nrgifk5Ep1w2snaY",
  authDomain: "dupmov.firebaseapp.com",
  projectId: "dupmov",
  storageBucket: "dupmov.firebasestorage.app",
  messagingSenderId: "968336898444",
  appId: "1:968336898444:web:50330935930ad5ee6a7ea9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res= await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
     
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout }