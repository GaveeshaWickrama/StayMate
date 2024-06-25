import React, { useState, useEffect } from 'react';
import Title from '../../components/common/Title';

export default function PendingTasks() {
  const [taskState, setTaskState] = useState([
    { id: 1, state: 'pending', title:"leaking faucet", description:"The kitchen faucet has been leaking for the past two days. Water drips continuously from the faucet even when it is turned off, and the leak seems to be getting worse.",postedBy:"user1",property:"golden rose",transportProvided: true },
    { id: 2, state: 'pending', title:"water leak", description:"The kitchen faucet has been leaking for the past two days. Water drips continuously from the faucet even when it is turned off, and the leak seems to be getting worse..",postedBy:"user1",property:"golden rose" ,transportProvided: false},
  ]);


  

  const handleAccept = () => {
    setTaskState(prevTaskState =>
      prevTaskState.map(task => ({ ...task, state: 'accepted' }))
    );
    
  };

  const handleReject = () => {
    setTaskState(prevTaskState =>
      prevTaskState.map(task => ({ ...task, state: 'rejected' }))
    );
  };

  useEffect(()=>{
    console.log("updated task state:",taskState.state);
  },[taskState]);

  const markProgress = () => {
    console.log('...marking progress');
  };

  return (
    <div className="min-h-screen pb-90">
      <Title title="Pending tasks" />
       
      <div className="container mx-auto p-4 mt-[80px] ml-[100px]">
        {taskState.map(task => (
          <div key={task.id} className="p-4 border rounded-lg shadow-md mb-4 w-[800px] mt-[50px] ml-[10px] flex">
            
            <div className="w-2/3 p-4 flex flex-col justify-between">
           
              <p className="text-md font-semibold ml-[30px]">
                {/* Task {task.id}: {task.state} */}
              </p>
              <p className="text-lg font-bold mt-2 ml-[30px] mb-4">{task.title}</p>
              <p className="text-sm text-gray-600 ml-[30px]">{task.description}</p>
              <div className="mt-[10px]">
                <p className="text-sm text-gray-600 ml-[30px] my-[5px]">Posted By {task.postedBy}</p>
                
              <p className="text-sm underline text-blue-600 ml-[30px]  my-[5px] cursor-pointer" >See Photos</p>
                {task.transportProvided && (<p className="text-sm text-gray-600 ml-[30px]  my-[5px]">Transport Provided</p>)} 
              
              </div>
              
              
              <div className="mt-4 flex  items-center justify-items-left">
                <button onClick={handleReject} className="font-semibold text-white text-sm px-10 py-2 rounded-xl bg-red-500 border border-red-500 rounded ml-[150px] mt-[50px]">
                  Reject
                </button>
                <button onClick={handleAccept} className="font-semibold text-white text-sm px-10 py-2 bg-blue-950 rounded-xl ml-[150px] mt-[50px]">
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
