import { createContext,useState,useEffect, useContext } from "react";
import { useAuth } from "./auth";
import io from "socket.io-client";

// Create the SocketContext
const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

// Create the SocketContextProvider
export const SocketContextProvider = ({ children }) => {

    console.log("Inside socketcontextprovider");

    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const { currentUser } = useAuth();
    console.log("currentUser :- ",currentUser);

    useEffect(()=>{
        if(currentUser) {
            const socket = io(import.meta.env.VITE_API_URL, {
                query : {
                    userId : currentUser.id,
                },
            });
            setSocket(socket);
            console.log("Socket ID",socket.id);

            socket.on('getOnlineUsers',(users) => {
                setOnlineUsers(users);
            });

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
