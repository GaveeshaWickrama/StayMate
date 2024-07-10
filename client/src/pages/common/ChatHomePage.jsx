import React from "react";
import ChatContacts from '../../components/common/ChatContacts'

const ChatHomePage = () => {
    return <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <ChatContacts />
        {/* <MessageContainer /> */}
    </div>
}

export default ChatHomePage;