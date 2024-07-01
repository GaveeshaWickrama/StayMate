import React from 'react';
import ChatComponent from '../../components/common/ChatComponent';
import Header from '../../components/common/Header';

const Chat = () => {
  return (
    <div className="flex-1 flex flex-col">
        <Header />
        <ChatComponent />
    </div>
  );
};

export default Chat;