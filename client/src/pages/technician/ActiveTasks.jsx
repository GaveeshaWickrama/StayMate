import React, {Component, useState} from 'react'

export default function ActiveTasks() {

  const [taskState, setTaskState] = useState();


  handleWithdraw = () => {
      {/* how to fetch only active tasks */}
      setTaskState((prevTaskState)=>{
        ...prevTaskState,
        prevTaskState.map((task)=>task.state:'withdraw');
      });
  }
  handleCompleted = () => {
      {/* how to fetch only active tasks */}
      setTaskState((prevTaskState)=>{
        ...prevTaskState,
        prevTaskState.map((task)=>task.state:'completed');
      });
  }


  markProgress = () => {

  }
  return (
    <div>
        <h1>Active Tasks</h1>
        <p>Progress</p>
        <button onClick={markProgress}></button>
        <button onClick={handleWithdraw}>Withdraw</button>
        <button onClick={handleCompleted}>Completed</button>
    </div>
  )
}
