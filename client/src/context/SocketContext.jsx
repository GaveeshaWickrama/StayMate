import { createContext,useState,useEffect } from "react";
import { useAuth } from "./auth";
import io from "socket.io-client";

// Create the SocketContext
export const SocketContext = createContext();

// Create the SocketContextProvider
export const SocketContextProvider = ({ children }) => {

    console.log("Inside socketcontextprovider");

    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const { currentUser } = useAuth();

    useEffect(()=>{
        if(currentUser) {
            const socket = io(import.meta.env.VITE_API_URL, {
                query : {
                    userId : currentUser._id,
                },
            });
            setSocket(socket);
            console.log("Socket ID",socket.id);

            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[currentUser]);

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
};
