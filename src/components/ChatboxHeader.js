import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import avatarimg from './avatar.jpg'

const ChatboxHeader = () => {
  const {data,dispatch}=useContext(ChatContext);
  const handelLogout =()=>{
     
    dispatch({type:"LOGOUT",payload:null});
    signOut(auth) 
  }
  return (
    <div className='chatbox-header'>
    {data.chatId && <img className ="avatar" src={data.user.photoURL?data.user.photoURL:avatarimg} alt=''/>}
    <h3>{data.user?.displayName}</h3>
    <button onClick={handelLogout} >Logout</button>
    </div>
  )
}

export default ChatboxHeader
