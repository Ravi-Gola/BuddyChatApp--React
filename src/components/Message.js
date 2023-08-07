import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {

    const scrollref = useRef();
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const date = message.date.toDate().toDateString();
    const time = message.date.toDate().toLocaleTimeString();
    const myDateTime = date + " " + time;
    useEffect(()=>{
        scrollref.current?.scrollIntoView({behavior:"smooth"})
    },[message])


    return (

        <div className={`message ${message.senderId === currentUser.uid && "sender"} `} ref={scrollref} >
            <img className="avatar" src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='' height={"50px"} width={"50px"} />
            <div className='message-info'>
                <h4 className={`reciever-text ${message.senderId === currentUser.uid && "sender-text"} `}>{message.text}</h4>
                <p>{myDateTime}</p>
                {message.file && <a href={message.file} style={{ cursor: "pointer" }}><img alt='Click' src={message.file} width={"150px"} height={"200px"} ></img></a>}
            </div>
        </div>
    )
}

export default Message
