


import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/auth";
import axios from 'axios';
import TabButtons from "../../components/guest/TabButtons";

import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FaHome, FaMapPin, FaClock, FaMapMarkerAlt, FaShower } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import { format } from 'date-fns';





function NoJobs(){
  return (
    <div className="text-center mt-20">
      <p className="text-lg text-gray-700 mx-20 my-20">no jobs found</p>
      {/* <Link to="/host/add-technician" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center space-x-2">
        
        
      </Link> */}
    </div>
  );
}


const TableComponent = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
      category: '',
      timestamp: '',
      status: ''
    });
    const [sortDate, setSortDate] = useState('');
  
    const navigate = useNavigate();

    useEffect(() => {
      let newData = data.filter(item =>
        (filters.category ? item.category.includes(filters.category) : true) &&
        (filters.timestamp ? item.date.includes(filters.timestamp) : true) &&
        (filters.status ? item.status.includes(filters.status) : true) &&
        (search ? Object.values(item).some(val => val.includes(search)) : true)
      );
  
    //   if (sortCategory) {
    //     newData.sort((a, b) => a.category.localeCompare(b.category));
    //   }
  
      if (sortDate) {
        newData.sort((a, b) => {
          if (sortDate === 'asc') {
            return new Date(a.timestamp) - new Date(b.timestamp);
          } else {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }
        });
      }
  
      setFilteredData(newData);
    }, [data, filters, search, sortDate]);
  
    const handleRowClick = (complaintId) => {
        // alert(complaintId);
        // navigate(`/host/complaint-details/`);
        navigate(`/technician/${complaintId}/task-details/`);

      };

    const handleFilterChange = (e) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSearchChange = (e) => {
      setSearch(e.target.value);
    };
  
    const handleSortCategoryChange = (e) => {
      setSortCategory(e.target.value);
    };
  
    const handleSortDateChange = (e) => {
      setSortDate(e.target.value);
    };

    const uniqueCategories = [...new Set(data.map(item => item.category))];
    const uniqueStatus = [...new Set(data.map(item => item.status))];

  
    return (
      <div className="bg-gray-100 mx-auto py-2 px-8">
        <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
           Tasks
        </h1>
        <div className="p-5 mt-3">
          
        </div>

      </div>
        <div className=''>
{/* 
        <div className='flex flex-row gap-10'>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="#"  className='text-blue-500 underline hover:underline-offset-4 hover:decoration-wavy transition-all duration-300'>All</a> </div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'><a href="/host/manage-complaints/pending" >Pending</a></div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="/host/manage-complaints/active" >Active</a> </div>



        

        </div> */}




        <div className="rounded-full pr-5 pt-2 mb-4 w-1/6">
          <input
            type="text"
            placeholder="Search "
            value={search}
            onChange={handleSearchChange}
            className="input input-bordered w-full mb-2 focus:outline-none"
            style={{
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -2px rgba(59, 130, 246, 0.5)',
                transition: 'box-shadow 0.2s ease-in-out'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 8px 10px -2px rgba(59, 130, 246, 0.7), 0 4px 6px -2px rgba(59, 130, 246, 0.7)'}
              onBlur={(e) => e.target.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -2px rgba(59, 130, 246, 0.5)'}
          />
        </div>
        </div>
      
        
        
        <div className="flex flex-wrap gap-4 mb-4 pb-7 ">
          <div>
            <label className="p-2 mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="input input-bordered shadow-blue focus:outline-none"
            >

            <option value="">All</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          </div>
          
          
          <div>
            <label className="p-2 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="input input-bordered shadow-blue focus:shadow-blue-strong focus:outline-none"
            > 
            <option value="">All</option>

             {uniqueStatus.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
            </select>
          </div>
          
          <div>
            <label className="p-2 mb-1 ring-offset-blue-700">Sort by Date</label>
            <select
              value={sortDate}
              onChange={handleSortDateChange}
              className="select select-bordered shadow-blue focus:outline-none"
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className='bg-white rounded-lg overflow-hidden mb-4'>
        <table className="table w-full">
          <thead>
            <tr className='text-blue-800 text-base border-b border-blue-500'>
              <th>Category</th>
              <th>Issue Reported</th>
              <th>Remarks by the host</th>
             
              <th>Property</th>
              <th>Date Reported</th>
              <th>Host Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          {console.log("this is the complaints length",filteredData.length)}

          {filteredData.length===0 ? (console.log("complaint length is zero")) : (console.log("comnplaint length is not zero"))}


          {complaints.length === 0 ? (


          console.log("complaint length is zero") || <NoJobs />): (


            filteredData.map((item, index) => {
                const formattedDate = format(new Date(item.timestamp), 'yyyy-MM-dd');

                return(

              <tr key={item._id} className="hover:bg-blue-100 cursor-pointer" onClick={() => handleRowClick(item._id)}>
                <td>{item.category}</td>
                <td>{item.description}</td>
                {/* <td>{item.reservationId.user.firstName} {item.reservationId.user.lastName} </td> */}

                <td>{item.reservationId.property.title}</td>
                <td>{formattedDate}</td>
                <td className='text-center'>
              {item.technician ? (
    item.technician.firstName
  ) : (
    'N/A'
  )}
              </td>
                <td>
                {item.status === 'jobCompleted' && (
          <button  > <span className='badge badge-ghost badge-sm '>Completed</span></button>
        )}
        {item.status === 'pendingTechnicianApproval' && (
          <button className=''> <span className='badge badge-ghost badge-sm whitespace-nowrap'>Pending Technician Approval</span></button>
        )}
        {item.status === 'active' && <span className='badge badge-ghost badge-sm'>active</span>}
              
        {item.status === 'pendingHostDecision' && (
          <button className=''> <span className='badge badge-ghost badge-sm whitespace-nowrap'>Pending Host Decision</span></button>
        )}
                </td>
                <td>
                <button className="bg-red-500 w-15 h-15 rounded-xl text-white text-xs p-2"onClick={() => handleStatusChange(item.id, 'in-progress')}> <span className=''>Terminate</span></button> 

                </td>
              </tr>
            ) }) )}
          </tbody>
        </table>
        </div>
      </div>
    );
  };
  
  // Example data for testing purposes
  


export default function Test() {

      // const technicianID = currentUser.id


    const { currentUser, loading } = useAuth();
    // const hostID = currentUser.id

    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();
    const [technicianID, setTechnicianID] = useState('');

    console.log("Current user object:", currentUser);
    console.log("this is the current user id",currentUser.id)
    console.log("this is the current user name",currentUser.firstName)

    console.log("technician id",technicianID)
    console.log("this is the technician id", technicianID)
    

    useEffect(()=>{

    
      const fetchComplaints = async () => {
        console.log("inside the fetchcomplaint");
        console.log(import.meta.env.VITE_API_URL);


        try{
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/${technicianID}/jobs`);
          console.log("Response from backend:", response.data); // Log the actual data
          console.log("Response from backend complaint id:", response.data._id); // Log the actual data

          setComplaints(response.data);
         
        }
        catch(error){
          console.error("Error fetching all complaints:", error); 
        
        }
          
  };

fetchComplaints();


    },[technicianID]);
    console.log("these are all the complaints",complaints)

    const handleRowClick = (complaintId) => {
     
     alert(complaintId);
     console.log("this is the complaint id", complaintId)
     // navigate(`/technician/${technicianID}/task-details`);
     navigate(`/technician/${complaintId}/task-details`);
   };


      


  return (
<div>
      <TableComponent data={complaints} />
    </div>
)
}
