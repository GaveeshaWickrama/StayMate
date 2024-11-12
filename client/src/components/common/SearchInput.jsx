import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import { toast } from 'react-toastify';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 2) {
      return toast.error("Search term must be atleast 2 characters long.")
    }
    
    const conversation = conversations.find((c) => `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()));

    if(conversations) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found"); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2" action="">
        <input type="text" placeholder='Search...' className='border border-black p-2 rounded-full'
        value = {search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput;
