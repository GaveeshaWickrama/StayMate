import React from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import useConversation from '../../zustand/useConversation';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { tempConversation } = useConversation();
  
  console.log("Conversations:", conversations);
  console.log("Temp Conversation:", tempConversation);

  return (
    <div className='py-2 flex flex-grow flex-col overflow-auto'>

      {tempConversation && (
        <Conversation
          key={tempConversation._id}
          conversation={tempConversation}
          unreadMessagesCount={0}  // Assuming temp conversation has no unread messages
          emoji={getRandomEmoji()}
          lastIdx={true}
        />
      )}

      {conversations.length ? (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation.otherParticipant._id}
            conversation={conversation.otherParticipant}
            unreadMessagesCount={conversation.unreadMessagesCount}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1 && !tempConversation}
          />
        ))
      ) : null}
      
      {!conversations.length && !tempConversation && (
        <div className='flex flex-grow items-center justify-center'>
          <p className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold'>No chat yet</p>
        </div>
      )}

      {loading && <span className='loading loading-spinner mx-auto'></span>}
    </div>
  );
};

export default Conversations;
