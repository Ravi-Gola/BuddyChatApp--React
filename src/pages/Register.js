import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { doc, setDoc} from "firebase/firestore";
import { db } from '../firebase';

const Register = () => {
   const navigate= useNavigate();
   const setUserDoc= async (user,username)=>{
      await setDoc(doc(db, "users", user.uid), {
         uid:user.uid,
         displayName: username,
        email: user.email,
        photoURL:null
      });

      await setDoc(doc(db, "userChats", user.uid), {} );
   }

   const handelSubmit =(e) => {
      e.preventDefault();
      const username = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;

      createUserWithEmailAndPassword(auth, email, password)
         .then(async (userCredential) => {
            const user = await userCredential.user;
            await updateProfile(user, {
               displayName: username
             }).then(() => {
               setUserDoc(user,username);
               navigate('/');
             }).catch((error) => {
               const errorMessage = error.message;
               console.log(errorMessage)
             });
            

         })
         .catch((error) => {
            //  const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
         });
   }

   return (
      <div className='register'>
         <div className='register-header'>
            <h3>Buddy Chat</h3>
            <p>Register</p>
         </div>
         <div className='register-form'>
            <form onSubmit={handelSubmit} >
               <input type='text' name='username' placeholder='Enter your Username' />
               <input type='email' name='email' placeholder='Enter your Email' />
               <input type='password' name='password' placeholder='Enter your Password' />
               <button type='submit' >Register</button>
            </form>
         </div>
         <div className='register-footer'>

            <p>If you have an account? <Link to='/login'>Login</Link></p>
         </div>
      </div>
   )
}

export default Register
