import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {FaInfoCircle, FaPlus} from 'react-icons/fa';
import SearchBar from './SearchBar';
import { IoFilterOutline } from "react-icons/io5";
import Caraousel from './components/Caraousel';


function TechnicianCard({technician}){
  return(
    // <Link to={{pathname:`/technician/${technician._id}`, state: {complaintID}}}>
    <Link to={{pathname:`/host/technician-details/${technician._id}`}}>


    
    <div className="bg-white shadow-lg  overflow-hidden border border-transparent transform transition-transform duration-300 hover:scale-105 relative card-hover-border rounded-lg w-auto">
    
    <div className='flex w-full '>
    <div className="flex flex-col justify-between pl-3 w-auto overflow-hidden">
    <div>

      <div className='flex flex-row items-baseline'>
      <div className='w-5 h-5 rounded-full bg-blue-500 p-1'></div>
      <h2 className="text-lg font-semibold text-black-500 mb-2 pt-0.5">{technician.firstName} {technician.lastName}</h2>
      </div>
      
    <div className="flex  flex-col">
    
    <p className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">Plumber</p>
    <p className="text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">4.5</p>
    </div>
    </div>
</div>
</div>



    </div>



    </Link>
  );
}


function NoTechnicians(){
  return (
    <div className="text-center mt-20">
      <p className="text-lg text-gray-700 mb-10">Technicans unavailable at the moment</p>
      <Link to="/host/add-technician" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center space-x-2">
        <FaPlus />
        
      </Link>
    </div>
  );
}


function TechnicianExplore(){


  const location = useLocation();
  // const {complaintID} = location.state;
  const navigate = useNavigate;

  const [technicians, setTechnicians] = useState([]);

  useEffect(()=>{
    alert("hello world");

    const fetchTechnicians = async () => {

      await axios.get(`${import.meta.env.VITE_API_URL}/technicians/all`)
      .then((res)=>{
        // alert("these are the data",res.data);

        setTechnicians(res.data);
      })
      .catch((error)=>{
        alert("error fetching technicians", error);
      })
    }

    fetchTechnicians();

  },[]);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">
        Find a technician
      </h1>
      <div className="bg-gray-300 h-5/6 p-4">
      <div className="flex flex-row gap-0.5">
      <SearchBar />
      <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-0.1 bg-blue-300 outline-none">
            <IoFilterOutline />
            
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
       
       
        <div className='bg-gray-100'>
          <h1 className="text-xl font-bold text-black-300 p-4 border-b-4 border-blue-600 m-5">
            Top Rated
          </h1>

          {technicians.length === 0 ? (
            <NoTechnicians />
          ) : (
            <div className="flex flex-row gap-8">
              {technicians.map((technician) => (
                <TechnicianCard key={technician._id} technician={technician} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-xl font-bold text-black-300 p-4 border-b-4 border-blue-600 m-5">
            Nearby
          </h1>

          {technicians.length === 0 ? (
            <NoTechnicians />
          ) : (
            <div className="flex flex-row gap-8">
              {technicians.map((technician) => (
                <TechnicianCard key={technician._id} technician={technician} />
              ))}
            </div>
          )}
        </div>

        <div className='bg-gray-400 mt-[200px] justify-center'>
          <h1 className="text-xl font-bold text-black-300 p-4 border-b-4 border-blue-600 m-5">
           All results
          </h1>

          {technicians.length === 0 ? (
            <NoTechnicians />
          ) : (
            <div className="flex flex-row gap-8 flex-wrap">
              {technicians.map((technician) => (
                <TechnicianCard key={technician._id} technician={technician} />
              ))}
            </div>
          )}


<div className="join m-10">
  <button className="join-item btn">1</button>
  <button className="join-item btn btn-active">2</button>
  <button className="join-item btn">3</button>
  <button className="join-item btn">4</button>
</div>
        </div>
          


          


      
      </div>
      
    </div>
  );
}


export default TechnicianExplore;