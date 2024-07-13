import React from "react";
import ChatContacts from '../../components/common/ChatContacts'
import MessageContainer from '../../components/common/MessageContainer'

const ChatHomePage = () => {
    return( 
    <div className="p-4 h-screen flex items-center justify-center">
        <div className="flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex-1">
            <ChatContacts />
            <MessageContainer />
        </div>
    </div>
    )
}

export default ChatHomePage;