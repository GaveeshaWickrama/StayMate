import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import axios from "axios";

const useSendMessage = () => {

    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation(); 
    const { token } = useAuth()

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/message/send/${selectedConversation._id}`,
                {message},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                     'Content-Type': 'application/json'
                  },
                }
            );
            const data = res.data;
            if(data.error) throw new Error(data.error);

            setMessages([...messages,data]);
        } catch (error) {
            console.log("send message error : ",error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading };
}

export default useSendMessage;