import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
   const navigate=useNavigate();

   const handelSubmit = (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => { 
            // const user = userCredential.user;
            navigate('/')
         })
         .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
         });

   }
   return (
      <div className='login'>
         <div className='login-header'>
            <h3>Buddy Chat</h3>
            <p>Login</p>
         </div>
         <div className='login-form'>
            <form onSubmit={handelSubmit} >
               <input type='email' name='email' placeholder='Enter your Email' />
               <input type='password' name='password' placeholder='Enter your Password' />
               <button type='submit' >Login</button>
            </form>
         </div>
         <div className='login-footer'>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
         </div>
      </div>
   )
}

export default Login
