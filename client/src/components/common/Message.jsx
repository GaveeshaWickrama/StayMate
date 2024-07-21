import React from 'react'
import { useAuth } from '../../context/auth'
import useConversation from '../../zustand/useConversation';

const Message = ({message}) => {
  console.log("inside Message.jsx",message);
  const {currentUser} = useAuth();
  console.log(currentUser);
  const {selectedConversation} = useConversation();
  const fromMe = message._id === currentUser.id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  //const profilePic = fromMe ? ( `{${import.meta.env.VITE_API_URL}/uploads/${currentUser?.picture}}` || `{${import.meta.env.VITE_API_URL}/uploads/defaultPic.jpg}` ) :(`{${import.meta.env.VITE_API_URL}/uploads/${selectedConversation?.picture}}` ||`{${import.meta.env.VITE_API_URL}/uploads/defaultPic.jpg}`) ; 
  const profilePic = `${import.meta.env.VITE_API_URL}/uploads/defaultPic.jpg`;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-blue-500";
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="profilePic" />
            </div>
        </div>

        <div className={`chat-bubble text-black ${bubbleBgColor}`} >{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
      
    </div>
  )
}

export default Message
