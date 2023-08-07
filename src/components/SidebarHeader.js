import React, { useContext, useRef, useState } from 'react'
import {updateProfile } from 'firebase/auth';
import {storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const SidebarHeader = () => {

  const openFile = useRef();
  const { currentUser } = useContext(AuthContext)
  const [profileUrl,setProfileUrl]=useState();
  const uploadProfileImg = () => {
    openFile.current.click();
  }
  const uploadFile =(file) => {
    const storageRef = ref(storage, currentUser.displayName);

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
        console.log('default')
    }
  }, 
  (error) => {
    console.log(error.message)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      updateProfile(currentUser, {
         photoURL:downloadURL
      })
      const UserRef = doc(db, "users", currentUser.uid);
      updateDoc(UserRef, {
        photoURL:downloadURL 
      });
      
      setProfileUrl(downloadURL);
    });
  }
);
    
  }
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
     
    if (file) {
      uploadFile(file);
    }
  }
  return (
    <div className='sidebar-header'>
      Buddy Chat
      <div className='userInfo'>
        <input ref={openFile} type='file' alt='' style={{ display: "none" }} onChange={handleFileSelect} />
        <img className='avatar' src={profileUrl} alt='' height={"50px"} width={"50px"} style={{ cursor: "pointer" }} onClick={uploadProfileImg} />
        <p>{currentUser.displayName}</p>
      </div>
    </div>
  )
}

export default SidebarHeader
