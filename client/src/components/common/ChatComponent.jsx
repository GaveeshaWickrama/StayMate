import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { message: 'addghtnnhnhhkyjhggmg', sender: 'other' },
    { message: 'addghtnnhnhhkyjhggmg fbghhhbbngbngbnmg', sender: 'user' },
    { message: 'addghtnnhnhhkyjhggmg', sender: 'other' },
    { message: 'addghtnnhnhhkyjhggmg fbghhhbbngbngbnmg', sender: 'user' },
    { message: 'addghtnnhnhhkyjhggmg', sender: 'other' },
    { message: 'addghtnnhnhhkyjhggmg fbghhhbbngbngbnmg', sender: 'user' },
    // Add more messages here
  ]);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, { message: newMessage, sender: 'user' }]);
  };

  return (
    <div className="flex-1 bg-custom-gray p-6 flex flex-col">
      <div className="mb-6 text-2xl">
        <span>Chat</span>
        <span className="text-lg ml-2">My profile &gt; Chat</span>
      </div>
      <div className="flex-1 flex flex-col space-y-4 overflow-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender} />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatComponent;
