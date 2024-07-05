import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {FaInfoCircle, FaPlus} from 'react-icons/fa';





function TechnicianCard({technician}){
  return(
    <Link to={`/technician/${technician._id}`}>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-transparent transform transition-transform duration-300 hover:scale-105 relative card-hover-border">
    
    <div className='flex w-full'>
    <div className="flex flex-col justify-between pl-6 w-2/3 overflow-hidden">
    <div>
    <h2 className="text-2xl font-semibold text-black-500 mb-2 pt-3">{technician.firstName}</h2>
    <div className="flex items-center mb-2">
    <FaInfoCircle className="text-blue-500 mr-2" />
    <p className="text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">{technician.lastName}</p>
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
  const [technicians, setTechnicians] = useState([]);

  useEffect(()=>{
    alert("hello world");

    const fetchTechnicians = async () => {

      await axios.get(`${import.meta.env.VITE_API_URL}/technicians/all`)
      .then((res)=>{
        alert("these are the data",res.data);

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
            <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">technicians</h1>
            {technicians.length === 0 ? (<NoTechnicians/>) : (
                 <div className="flex flex-col gap-8">
                  {technicians.map((technician) => (
                    <TechnicianCard
                    key={technician._id}
                    technician = {technician}
                    />
                  ))}
                  </div>
            )}
      </div>
  );
}


export default TechnicianExplore;