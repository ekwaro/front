import {initializeApp} from "firebase/app";
import FlashMessage from 'react-flash-message'
import { getFirestore,   collection,   addDoc } from "firebase/firestore";
import { getAuth,updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword,sendPasswordResetEmail,signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };
  
  // Initialize Firebase tools
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res){
        return(<FlashMessage duration={5000}>
          <strong>Successfully Logged in</strong>
        </FlashMessage>)
      }
      else{
        return(<FlashMessage duration={5000}>
          <strong>Successfully Logged in</strong>
        </FlashMessage>)

      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password, usertype) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        usertype,
        createdAt: new Date().getSeconds(),

        
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
    updateProfile(auth.currentUser,{
      displayName:name
    }).then(()=>{
      alert("uername updated successfully")
    }).catch((error)=>{
      alert(error)

    })

  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };
  export {db, auth,sendPasswordReset, logInWithEmailAndPassword,registerWithEmailAndPassword, logout};

