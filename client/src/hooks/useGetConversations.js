import { useState,useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

const useGetConversations = () => {

    const currentUser = useAuth();
    const token = currentUser.token

    const [loading,setLoading] = useState(false);
    const [conversations,setConversations] =useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/message/`, {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = res.data;

                if(data.error){
                    console.log(data.error);
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
                console.log(data.error);
            } finally {
                setLoading(false);
            }
        }

        getConversations();
    },[]);

    return { loading,conversations };
}

export default useGetConversations;