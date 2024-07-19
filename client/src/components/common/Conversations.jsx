import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const {loading,conversations} = useGetConversations();
  console.log("Conversations : ",conversations);


  return (
    <div className='py-2 flex flex-grow flex-col overflow-auto '>
      {conversations.length ? (
        conversations.map(( conversation, idx ) => (
          <Conversation
            key={conversation._id} /* Each conversation in given unique id(id of whome you are chatting with) */
            conversation = {conversation}
            emoji = {getRandomEmoji()}
            lastIdx = {idx == conversations.length-1}
          />
        ))
      ) : (
    /*     <div className='flex flex-grow items-center justify-center'>
          <p className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold'>No chat yet</p>
        </div> */
        null
      )
      }



      {loading ? <span className='loading loading-spinner mx-auto'></span> : null }
    </div>
  )
}

export default Conversations
