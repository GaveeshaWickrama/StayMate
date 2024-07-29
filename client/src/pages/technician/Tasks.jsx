// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import { useAuth } from "../../context/auth";

// function NoJobs() {
//   return (
//     <div className="text-center mt-20">
//       <p className="text-lg text-gray-700 mx-20 my-20">no jobs found</p>
//     </div>
//   );
// }

// export default function Tasks() {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   // Mock data
//   const mockComplaints = [
//     {
//       _id: '1',
//       category: 'Electrical',
//       title: 'Power outage',
//       description: 'The lights are not working',
//       timestamp: '2024-07-01T12:00:00Z',
//     },
//     {
//       _id: '2',
//       category: 'Plumbing',
//       title: 'Leakage',
//       description: 'There is a leakage in the bathroom',
//       timestamp: '2024-07-02T14:30:00Z',
//     },
//     {
//       _id: '3',
//       category: 'HVAC',
//       title: 'AC not working',
//       description: 'The air conditioning is broken',
//       timestamp: '2024-07-03T10:15:00Z',
//     },
//   ];

//   const [complaints, setComplaints] = useState(mockComplaints);

//   const handleRowClick = (complaintId) => {
//     alert(complaintId);
//     console.log("this is the complaint id", complaintId);
//     navigate(`/technician/${complaintId}/task-details`);
//   };

//   return (
//     <div className="bg-gray-100 mx-auto py-2 px-8">
//       <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
//         <h1 className="flex items-center text-4xl font-extrabold text-black-600">
//           Tasks
//         </h1>
//       </div>

//       <div className="bg-white rounded-lg overflow-hidden mb-4">
//       </div>

//       <div className="w-full">
//         <div className='flex flex-row gap-10'>
//           <div className='title-l pt-4 pb-2 pl-1 mb-3'>
//             <a href="/technician/tasks/" className='text-blue-500 underline hover:underline-offset-4 hover:decoration-wavy transition-all duration-300'>All</a>
//           </div>
//           <div className='title-l pt-4 pb-2 pl-1 mb-3'>
//             <a href="/technician/tasks/pending" className=''>Pending</a>
//           </div>
//           <div className='title-l pt-4 pb-2 pl-1 mb-3'>
//             <a href="/technician/tasks/active" className=''>Active</a>
//           </div>
//         </div>

//         <div className="w-full rounded-lg p-1 bg-white shadow">
//           <div className="overflow-x-auto w-full">
//             <table className="table auto w-full">
//               <thead>
//                 <tr className='text-blue-800'>
//                   <th></th>
//                   <th>Property Address</th>
//                   <th>Issue Reported</th>
//                   <th>Date reported</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {complaints.length === 0 ? (
//                   <NoJobs />
//                 ) : (
//                   complaints.map((complaint, index) => {
//                     const formattedDate = format(new Date(complaint.timestamp), 'yyyy-MM-dd');
//                     return (
//                       <tr key={complaint._id} className="hover:bg-gray-100" onClick={() => handleRowClick(complaint._id)}>
//                         <th>{index + 1}</th>
//                         <td>{complaint.category}</td>
//                         <td>{complaint.title} : {complaint.description}</td>
//                         <td>{formattedDate}</td>
//                         <td><span>complete</span></td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




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
        navigate(`/technician/task-details/`);

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
            {filteredData.map((item, index) => {
                const formattedDate = format(new Date(item.timestamp), 'yyyy-MM-dd');

                return(

              <tr key={item._id} className="hover:bg-blue-100 cursor-pointer" onClick={() => handleRowClick(item._id)}>
                <td>{item.category}</td>
                <td>{item.description}</td>
                {/* <td>{item.reservationId.user.firstName} {item.reservationId.user.lastName} </td> */}

                <td>{item.reservationId.property.title}</td>
                <td>{item.formattedDate}</td>
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
            ) })}
          </tbody>
        </table>
        </div>
      </div>
    );
  };
  
  // Example data for testing purposes
  


export default function Test() {


    const { currentUser, loading } = useAuth();
    const hostID = currentUser.id
    const [complaints, setComplaints] = useState([]);

   
    // const exampleData = [
    //     {
    //       category: 'Network',
    //       issue: 'Internet not working',
    //       date: '2024-07-01',
    //       technician: 'John Doe',
    //       status: 'Open'
    //     },
    //     {
    //       category: 'Hardware',
    //       issue: 'PC not starting',
    //       date: '2024-07-02',
    //       technician: 'Jane Smith',
    //       status: 'Closed'
    //     },
    //     // Add more data as needed
    //   ];


    useEffect(()=>{

    
        const fetchComplaints = async () => {
          console.log("inside the fetchcomplaint");
          console.log(import.meta.env.VITE_API_URL);
  
         
          try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/${hostID}`);
            console.log("Response from backend:", response.data); // Log the actual data
  
            setComplaints(response.data);
            console.log(complaints)
          }
          catch(error){
            console.error("Error fetching complaints:", error); 
          
          }
            
    };
  
  fetchComplaints();
  
  
      },[hostID]);



      


  return (
<div>
      <TableComponent data={complaints} />
    </div>
)
}
