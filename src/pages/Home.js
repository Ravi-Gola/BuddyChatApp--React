import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chatbox from '../components/Chatbox'
import { AuthContext } from '../context/AuthContext'


const Home = () => {
  const{currentUser}=useContext(AuthContext);
  return (
    
    <div className='home'>
         <Sidebar />
         <Chatbox key={currentUser.uid} />
    </div>
  )
}

export default Home
