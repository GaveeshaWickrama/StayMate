import { createContext,useState,useEffect } from "react";
import { useAuth } from "./auth";
import io from socket.io-client;

// Create the SocketContext
export const SocketContext = createContext();

// Create the SocketContextProvider
export const SocketContextProvider = ({ children }) => {

    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const { currentUser } = useAuth();

    useEffect(()=>{
        if(currentUser) {
            const socket = io(import.meta.env.VITE_API_URL);
            setSocket(socket);

            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
};
