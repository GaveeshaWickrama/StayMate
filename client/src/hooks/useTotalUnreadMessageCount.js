import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';

const useTotalUnreadMessageCount = () => {
    const { socket } = useSocketContext();
    const { currentUser, token } = useAuth();
    const { totalUnreadMessageCount, setTotalUnreadMessageCount } = useConversation();

    useEffect(() => {
        if (!currentUser || !token) {
            console.error("Current user or token is undefined", currentUser, token);
            return;
        }

        const getTotalUnreadMessageCount = async () => {
            console.log("Current user inside getTotalUnreadMessageCount: ", currentUser);

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/message/getTotalUnreadMessageCount/${currentUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                console.log("After getTotalUnreadMessageCount API call", res);
                const count = res.data;
                console.log("Unread Message Count: ", count);
                setTotalUnreadMessageCount(count);
            } catch (error) {
                console.error("getTotalUnreadMessageCount error: ", error.message);
                if (error.response) {
                    console.error("Error details: ", error.response.data);
                }
                toast.error("Failed to fetch unread message count.");
            }
        };

        getTotalUnreadMessageCount();

        socket?.on('newMessage', (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setTotalUnreadMessageCount(totalUnreadMessageCount+1);
        });

        return () => {
            socket?.off("newMessage");
        };

    }, [currentUser, token, socket, setTotalUnreadMessageCount, totalUnreadMessageCount]);

    return totalUnreadMessageCount;
};

export default useTotalUnreadMessageCount;
