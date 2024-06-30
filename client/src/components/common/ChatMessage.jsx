import React from 'react';
import adminprofilepic from "../../assets/adminprofilepic.png";
import profile from "../../assets/profile.jpg";

const ChatMessage = ({ message, sender }) => {
  const messageClass = sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start';
  const profilePic = sender === 'user' ? {adminprofilepic} : {profile}

  return (
    <div className={`flex items-start mb-4 ${sender === 'user' ? 'flex-row-reverse' : ''}`}>
      <img
        src={profilePic}
        alt="Profile"
        className="w-10 h-10 rounded-full mx-2"
      />
      <div className={`p-4 rounded-lg ${messageClass}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
