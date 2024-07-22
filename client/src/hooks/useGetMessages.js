import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/auth";

const useGetMessages = () => {
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    const {token} = useAuth();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/message/${selectedConversation._id}`,
                    {
                        headers: {
                          Authorization: `Bearer ${token}`,
                           'Content-Type': 'application/json'
                        },
                    }
                );
                const data = res.data;
                if(data.error) throw new Error(error.message);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        if(selectedConversation?._id) getMessages();
    },[selectedConversation?._id]);

    return {loading,messages};
}

export default useGetMessages;
