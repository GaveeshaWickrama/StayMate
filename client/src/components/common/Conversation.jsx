import React from 'react'

const Conversation = ({conversation,lastIdx,emoji}) => {

    const imageUrl = conversation.picture
    ? conversation.picture
    : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';

  return <>
    <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
        
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src={imageUrl} alt="User Image" />
            </div>
        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className=' text-black'>{`${conversation.firstName} ${conversation.lastName}`}</p>
                <span className='text-xl'>{emoji}</span>
            </div>
        </div>
    </div>

    {!lastIdx && <div className='divider my-0 py-0 h-1'/> }
  </>
}

export default Conversation
