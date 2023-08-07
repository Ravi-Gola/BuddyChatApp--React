import React , { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import Message from './Message';
// import { AuthContext } from '../context/AuthContext';

const ChatboxMessage = () => {
  const {data}=useContext(ChatContext);
  const [messages,setMessages]=useState([]);

  // const {currentUser}=useContext(AuthContext)
  useEffect(()=>{
     setMessages([]);
  },[])
  useEffect(()=>{
       
       const getMessages =()=>{
       onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
         });
  
       }
       
        data.chatId && getMessages();
       
    

  },[data.chatId])
  return (
    <div className='chatbox-messages'>
       {messages?.map(msg=>{
          return <Message key={msg.id} message={msg} />
       })}
    </div>
  )
}

export default ChatboxMessage
