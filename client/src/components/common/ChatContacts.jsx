import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';

const ChatContacts = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col h-full'>
      
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />

    </div>
  )
};

export default ChatContacts;
