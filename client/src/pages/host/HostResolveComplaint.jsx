import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
// import Carousel from '../../components/Carousel';
import { FaHome, FaClock, FaMapMarkerAlt, FaShower } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";

function HostResolveComplaint() {
  const navigate = useNavigate();

  const handleResolve = () => {





    navigate(`/host/manage-complaints`);
  };

  //   }

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          Resolve
        </h1>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
          <div className="bg-white p-8 flex flex-col items-center ">
            <p className="text-lg font-bold mb-3">
              Do you have any comments to add?
            </p>
            <textarea
              placeholder="Bio"
              className="textarea textarea-bordered textarea-md w-full max-w-xs"
            ></textarea>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow"></div>
      </div>

      <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-lg">description here</p>
      </div>

      <div>
        <button
          onClick={() => handleResolve()}
          className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default HostResolveComplaint;
