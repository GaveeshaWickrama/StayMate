
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

import { useParams } from 'react-router-dom';
// import Carousel from '../../components/Carousel';
import { FaHome, FaClock, FaMapMarkerAlt, FaShower } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";

// const capitalizeWords = (str) => {
//   return str.replace(/\b\w/g, char => char.toUpperCase());
// };

function CompletedTaskDetails() {


  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <FaHome className="mr-4" /> property titile
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          <FaClock className="mr-2" /> <span>Added on: date</span>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
          <div className="bg-white p-8 flex items-center border-b">
            <FaMapMarkerAlt className="mr-2" />
            <p className="font-semibold">address province</p>
          </div>
          <div className="bg-white p-8 flex items-center text-xl gap-4 border-b">
            <MdOutlineMeetingRoom className='text-blue-500' /><p>something:something</p>
            <IoBedSharp className='ml-3 text-blue-500' /><p>something:something</p>
            <FaShower className='ml-3 text-blue-500' /><p>something:something</p>
            <GoPersonFill className='ml-3 text-blue-500' /><p>something:something</p>
          </div>
          <div className="bg-white p-8 flex items-center">
            <h2 className="text-xl font-bold">Rating: </h2>
            <p className='ml-4'>No reviews yet.</p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Hosted By</h2>
         <div>user1</div>
        </div>
      </div>

      <div className='w-full rounded-lg p-6 bg-white shadow mt-2'>
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className='text-lg'>description here</p>
      </div>

      <div>

</div>
    </div>
  );
}

export default CompletedTaskDetails;

