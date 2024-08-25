import { useAuth } from "../context/auth";
import useConversation from '../zustand/useConversation';
import { toast } from "react-toastify";
import axios from "axios";

const useCreateOrSelectConversation = () => {
    const { setSelectedConversation,setTempConversation } = useConversation();
    const { token } = useAuth();

    const createOrSelectConversation = async (otherUserId) => {
        try {
            console.log("Inside try before api request",otherUserId);
            console.log(`${import.meta.env.VITE_API_URL}/message/createOrSelectConversation/${otherUserId}`);
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/message/createOrSelectConversation/${otherUserId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { conversation , otherUser } = res.data;
            console.log("Inside try after api request");
            if(!conversation) {
                setTempConversation(otherUser);
            }
            console.log("the returned conversation from createOrSelectConversation: ", otherUser);
            setSelectedConversation(otherUser);
        
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
        return;
    };

    return { createOrSelectConversation };
};

export default useCreateOrSelectConversation;
