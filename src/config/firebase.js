import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAY3JvEdZLRdWSyXEUg5ibUPmFEzVMNMGc",
  authDomain: "chat-app-4321f.firebaseapp.com",
  projectId: "chat-app-4321f",
  storageBucket: "chat-app-4321f.appspot.com",
  messagingSenderId: "390729952305",
  appId: "1:390729952305:web:c23d87839099da53f73910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

export const signup = async (username,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hi there I am using batcheet",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
        toast.success("signed up successfully")
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}

export const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
        toast.success("logged in successfully")
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
export const logout = async()=>{
    try {
        await signOut(auth)
        
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}