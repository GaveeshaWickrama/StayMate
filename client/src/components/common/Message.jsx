import React from 'react'
import { useAuth } from '../../context/auth'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {

  const {currentUser} = useAuth();
  const {selectedConversation} = useConversation();

  const fromMe = message.senderId == currentUser.id;

  const chatClassName = fromMe ? 'chat-end' : 'chat-start';

  const myDefaultPic = currentUser.gender == 'male' ? `${import.meta.env.VITE_API_URL}/uploads/profilepictures/maleDefaultPic.png` : `${import.meta.env.VITE_API_URL}/uploads/profilepictures/femaleDefaultPic.png`;

  const otherUserDefaultPic = selectedConversation.gender == 'male' ? `${import.meta.env.VITE_API_URL}/uploads/profilepictures/maleDefaultPic.png` : `${import.meta.env.VITE_API_URL}/uploads/profilepictures/femaleDefaultPic.png`;

  const myProfilePic = currentUser.picture ? `${import.meta.env.VITE_API_URL}/${currentUser.picture}` :  myDefaultPic;

  const otherUserProfilePic = selectedConversation.picture ? `${import.meta.env.VITE_API_URL}/${selectedConversation.picture}` :  otherUserDefaultPic;

  const profilePic = fromMe ? myProfilePic : otherUserProfilePic;
  
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300";
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="profilePic" />
            </div>
        </div>

        <div className={`chat-bubble text-black ${bubbleBgColor} pb-2`} >{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{extractTime(message.createdAt)}</div>
      
    </div>
  )
}

export default Message
