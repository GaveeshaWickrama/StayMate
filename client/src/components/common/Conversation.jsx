import React from 'react'
import { useState } from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/auth";
import axios from 'axios';
import { useEffect } from 'react';

const Conversation = ({conversation,lastIdx,emoji,unreadMessagesCount}) => {

    const [eachUserUnreadMessagesCount,setEachUserUnreadMessagesCount] = useState(unreadMessagesCount);

    const {selectedConversation, setSelectedConversation,totalUnreadMessageCount,setTotalUnreadMessageCount}= useConversation();

    const { currentUser, token } = useAuth();

    const isSelected = selectedConversation?._id === conversation._id;
    
    const {onlineUsers,socket} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    console.log("onlineusers :- ",onlineUsers);

    console.log("Conversation inside conversation :- ",conversation);
   
    console.log("Selected conversation",selectedConversation);


    const DefaultPic = conversation?.gender == 'male' ? `${import.meta.env.VITE_API_URL}/uploads/profilepictures/maleDefaultPic.png` : `${import.meta.env.VITE_API_URL}/uploads/profilepictures/femaleDefaultPic.png`;

    const imageUrl = conversation?.picture ? `${import.meta.env.VITE_API_URL}/${selectedConversation.picture}` :  DefaultPic;


    const updateReadStatus = async () => {

      console.log("Update Read Status");

      try {
    
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/message/updateReadStatus/${conversation._id}`,
          {},// Empty object for data since this is a PATCH request
          {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }) ;

        setTotalUnreadMessageCount(totalUnreadMessageCount-eachUserUnreadMessagesCount);
        setEachUserUnreadMessagesCount(0); 

      } catch (error) {
        console.error("updateReadStatus error: ", error.message);
        toast.error("Failed to update read status");
      }
    };
   
//Use global store for the conversations as well in order to fix the bug(Not sure Need to terst)
    useEffect(() => {
      const handleNewMessage = (newMessage) => {
          if (conversation._id === newMessage.senderId) {
              setEachUserUnreadMessagesCount(eachUserUnreadMessagesCount + 1);
          }
      };
  
      socket.on('newMessage', handleNewMessage);
  
      return () => {
          socket.off('newMessage', handleNewMessage);
      };
  }, [eachUserUnreadMessagesCount]);

  return <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : "" }
        `}
        onClick={() => {
          console.log("Conversation clicked");
          setSelectedConversation(conversation);
          updateReadStatus();
        }}
        >
        
        <div className={`avatar ${isOnline ? "online" : ""} `}>
            <div className='w-12 rounded-full'>
                <img src={imageUrl} alt="User Image" />
                {eachUserUnreadMessagesCount > 0 && (
              <div
                className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                style={{ transform: "translate(-20%, -20%)" }}
              >
                {eachUserUnreadMessagesCount}
              </div>
            )}
            </div>
        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className=' text-black'>{`${conversation.firstName} ${conversation.lastName}`}</p>
                <span className='text-xl'>{emoji}</span>
            </div>
  
        </div>
    </div>

    {!lastIdx && <div className='divider my-0 py-0 h-1'/> }
  </>
}

export default Conversation
