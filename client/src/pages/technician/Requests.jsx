import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';

export default function Requests() {
    const [requests, setRequests] = useState([]);


    //mock fetch function for getting requests from an API
    const fetchRequests = async () => {
            const data = [
                
                    { id: 1, description: 'Fix leaking sink', status: 'pending' },
                    { id: 2, description: 'repair broken window', status: 'active' }

                    
                
            ];
            setRequests(data);
        
    };

    useEffect(()=>{
            fetchRequests();
    },[]);

    const handleAccept = (id) => {
        setRequests((prevRequests)=>
        prevRequests.map((request)=>
            request.id ===id ? { ...request, status:'accepted'} : request
        )
        );
        Navigate('./active-tasks');
    };

    const handleReject = (id) => {
        setRequests((prevRequests)=>
        {
            prevRequests.map((request)=>
            request.id === id ? {...request, status : 'rejected'} : request
            )
        }
        );
    }
  return (
    <div>
        hello world!
            <h1>Repair requests</h1>
            {requests.length === 0 ? (<p>no requests available</p>): (
                <ul>
                        {requests.map((request)=> (
                                <li key={request.id}>
                                    <p>{request.description}</p>
                                    <p>Status:{request.status}</p>
                                    {request.status==='pending' && (
                                        <>
                                        <button onClick={()=> handleAccept(request.id)}> Accept</button>
                                        <button onClick={()=> handleReject(request.id)}>Reject</button>
                                        </>
                                    )}
                                </li>
                        ))}
                </ul>
            )}
    </div>
  )
}
