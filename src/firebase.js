import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { Await } from "react-router-dom";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyBAWkI1f9glzKHbvsegO6ZIlhAsvutDioQ",
  authDomain: "netflix-clone-e948a.firebaseapp.com",
  projectId: "netflix-clone-e948a",
  storageBucket: "netflix-clone-e948a.firebasestorage.app",
  messagingSenderId: "835694892120",
  appId: "1:835694892120:web:aca18a9fdffc967f8ee62d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=> {

    try {

       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;

       await addDoc(collection(db, "user"), {

          uid: user.uid,
          name,
          authProvider: 'local',
          email,


       })

        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));              

        
    }

}

const login = async(email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password)
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));              
    }
    
}
const logout = ()=>{
    signOut(auth)
}


export {auth, db, login, signup, logout};