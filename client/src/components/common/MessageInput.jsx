import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear the input box
    }
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-300">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button

        className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
