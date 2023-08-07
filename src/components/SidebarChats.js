import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';

const SidebarChats = () => {
  const {currentUser}= useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);
  const [chats,setchats]=useState([]);

 useEffect(()=>{

  const getChats =()=>{
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setchats(doc.data());
  });

  return ()=>{
    unsub();
    }
  }
  currentUser.uid && getChats();
 
 },[currentUser.uid])
 
const handelSelect =(userInfo)=>{
  dispatch({type:"CHANGE_USER",payload:userInfo});
}

  return (
    <div className='sidebar-chats'>
    {chats && Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>{
       return <div className='chat' key={chat[0]} onClick={()=>handelSelect(chat[1].userInfo)} >
       <img className='avatar'  src={chat[1].userInfo.photoURL && chat[1].userInfo.photoURL} alt='' height={"50px"} width={"50px"} />
       <div className='chatinfo'>
         <h3>{chat[1].userInfo.displayName}</h3>
         <p>{chat[1].lastMessage?.text}</p>
       </div>
     </div>
    })}
 </div>
  )
}

export default SidebarChats
