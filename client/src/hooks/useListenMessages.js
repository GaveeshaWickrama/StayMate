import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';


const useListenMessages = (setNewMessageCount) => {
    const {socket} = useSocketContext();
    const {messages,setMessages,selectedConversation} = useConversation();

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            if(selectedConversation._id === newMessage.senderId) {
                newMessage.shouldShake = true;
                setMessages([...messages,newMessage]);
            }
            
        });


        return () => {
            socket?.off("newMessage");
        }
    },[socket,setMessages,messages]);
};

export default useListenMessages
