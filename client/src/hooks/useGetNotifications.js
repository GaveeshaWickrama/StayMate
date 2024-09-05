import { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import { useSocketContext } from '../context/SocketContext';
import notificationSound from '../assets/sounds/notification.mp3';

const useGetNotifications = () => {

    const { socket } = useSocketContext();
    const { currentUser, token } = useAuth();
    const [notifications,setNotifications] = useState([]);

    useEffect(()=>{

        if (!currentUser || !token) {
            console.error("Current user or token is undefined", currentUser, token);
            return;
        }
    

        const getNotifications = async () => {

            try {

                const res = await axios.get(`${import.meta.env.VITE_API_URL}/notification/getNotifications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                  // Handle the response
                if (res.status === 200) {
                    const fetchedNotifications = res.data;
                    // You can update the state with notifications or handle them as needed
                    console.log("Notifications fetched successfully:", notifications);
                    setNotifications(fetchedNotifications);
                } else {
                    toast.error("Failed to fetch notifications.");
                }

                
            } catch (error) {
                console.error("Error fetching notifications:", error);
                toast.error("An error occurred while fetching notifications.");
            }
        }

        // Call the function to fetch notifications
        getNotifications();

        socket?.on('newNotification', (newNotification) => {
            const sound = new Audio(notificationSound);
            sound.play();
            //setNotifications([...notifications,newNotification]);
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        });

        // Optionally, clean up side effects if necessary
        return () => {
            // If there's any cleanup, do it here
            socket?.off("newNotification");
        };

    },[currentUser,token,notifications]);

    return { notifications };
}

export default useGetNotifications;