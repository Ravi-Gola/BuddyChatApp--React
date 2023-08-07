import React, {useContext, useRef, useState} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db, storage } from '../firebase';
import {v4 as uuid} from 'uuid';
import { ChatContext } from '../context/ChatContext';
import { doc,updateDoc ,arrayUnion,Timestamp, serverTimestamp} from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';

const Chatboxfooter = () => {
  const openfile=useRef()
  const [text,setText]=useState("");
  const [file,setfile]=useState();
  const {data}=useContext(ChatContext)
  const {currentUser}=useContext(AuthContext);
 
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setfile(selectedFile);
  };
  const handelSend =async ()=>{
    if(file){
const storageRef = ref(storage, uuid());

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          console.log("This is Done")
    }
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateDoc(doc(db,"chats" ,data.chatId),{
        messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        file:downloadURL
        })
      });
    });
  }
);
    }
    else{
      await updateDoc(doc(db,"chats" ,data.chatId),{
        messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now()
        })
      });
  }

  await updateDoc(doc(db,"userChats",currentUser.uid),{
    [data.chatId +".lastMessage"]:{
       text,
    },
    [data.chatId+ ".date"]:serverTimestamp(),
  });
  await updateDoc(doc(db,"userChats",data.user.uid),{
    [data.chatId +".lastMessage"]:{
       text,
    },
    [data.chatId+ ".date"]:serverTimestamp(),
  });
    

  setText("");
  setfile(null)
}
  return (
    
    <div className='chatbox-footer'>
     <input type='text' value={text} onChange={(e)=>{setText(e.target.value)}} placeholder='Type Something......'/>
     <div className='footer-icons'>
     <p>{file?.name}</p>
     <input ref={openfile} className='hidden' type='file' alt='file' onChange={handleFileSelect}  />
      <i className="icon fa-solid fa-paperclip" onClick={()=>{openfile.current.click()}}></i>
      <i className="icon fa-regular fa-image"></i>
      <button className='send' onClick={handelSend}>Send</button>
     </div>
    </div>
  )
}

export default Chatboxfooter
