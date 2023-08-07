import React from 'react'
import ChatboxHeader from './ChatboxHeader'
import ChatboxMessage from './ChatboxMessage'
import Chatboxfooter from './Chatboxfooter'
const Chatbox = () => {
  
  return (
    <div  className='chatbox'>
    <ChatboxHeader/>
    <ChatboxMessage/>
    <Chatboxfooter/>
    
    </div>
  )
}

export default Chatbox
