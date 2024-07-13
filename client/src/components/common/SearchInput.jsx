import React from 'react';
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2" action="">
        <input type="text" placeholder='Search...' className='border border-black p-2 rounded-full' />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput;
