import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

const MessageContainer = () => {
  return (
    <div className='flex flex-col flex-1'>
        <>
        {/* Header */}
            <div className='bg-slate-500 px-4 py-2 mb-2'>
                <span className='label-text'>To:</span>{" "}
                <span className='text-gray-900 font-bold'>Charith Lakshan</span>
            </div>

            <Messages />
            <MessageInput />
        </>
    </div>
  )
}

export default MessageContainer
