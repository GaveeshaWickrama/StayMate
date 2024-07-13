import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {
  FaInfoCircle
} from "react-icons/fa";


export default function ManageComplaints() {

    const [hostID, setHostID] = useState('6677b440ceb4d10a38fe8d61');
    const [complaints, setComplaints] = useState([]);

    useEffect(()=>{

     

 // const mockComplaints = [
      //   {
      //     _id: '1',
      //     reservation: '123',
      //     hostId: '6677b440ceb4d10a38fe8d61',
      //     category: 'Plumbing',
      //     propertyName: 'Apartment 101',
      //     title: 'Leaky Faucet',
      //     description: 'The kitchen faucet has been leaking for a week.',
      //     images: ['image1.jpg', 'image2.jpg'],
      //     status: 'pendingHostApproval',
      //     timestamp: new Date().toISOString(),
      //   },
      //   {
      //     _id: '2',
      //     reservation: '124',
      //     hostId: '6677b440ceb4d10a38fe8d61',
      //     category: 'Windows',
      //     propertyName: 'Apartment 202',
      //     title: 'Broken Window',
      //     description: 'The living room window is broken and needs replacement.',
      //     images: ['image3.jpg'],
      //     status: 'pendingHostApproval',
      //     timestamp: new Date().toISOString(),
      //   }
      // ]  

      // setComplaints(mockComplaints);



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

    

    function ComplaintCard ({complaint}) {
      const { timestamp } = complaint;
      const date = new Date(timestamp);
      const formattedDate = date.toISOString().split('T')[0];


      return(
        <Link to={`/host/complaint-details/${complaint._id}`}>

<div className="bg-white shadow-lg rounded-lg overflow-hidden border border-transparent transform transition-transform duration-300 hover:scale-105 relative card-hover-border">
<div className="flex w-full">

<h2 className='text-2xl font-semibold text-black-500 mb-2 pt-3'>
<div>{complaint.title}</div>
</h2>


<div className="flex items-center mb-2">
                <FaInfoCircle className="text-blue-500 mr-2" />
                <p className="text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                {complaint.description}
                </p>
              </div>


        <div className='flex items-center'>
            <p className='text-gray-700'>
              posted on
              {formattedDate}



            </p>
        </div>

</div>
</div>





   </Link>
      );
            
    }
  return (
    <div>

      {console.log("hello world!")}

        <div className="flex flex-col gap-8">
        
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint._id} complaint={complaint}
            />
          ))}
        </div>


    </div>
  )
}
