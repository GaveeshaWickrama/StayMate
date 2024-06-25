import React, {Component, useState, useEffect} from 'react'
import Title from '../../components/common/Title';
import { LinearProgress } from '@mui/material';
export default function ActiveTasks(prop) {

  const [taskState, setTaskState] = useState([]);


  handleWithdraw = () => {
      {/* how to fetch only active tasks */}
      setTaskState((prevTaskState)=>{
        
        prevTaskState.map(task=>({...task, state:'withdraw'}));
      });
  }
  handleCompleted = () => {
      {/* how to fetch only active tasks */}
      setTaskState((prevTaskState)=>{
        
        prevTaskState.map(task=>({...task, state:'completed'}));
      });
  }


  markProgress = () => {

  }
  return (
    <div>
       <Title title="Active tasks" />
        <p>Progress</p>
        <button onClick={markProgress} className=".MuiLinearProgress-bar"></button>
        <button onClick={handleWithdraw}>Withdraw</button>
        <button onClick={handleCompleted}>Completed</button>
    </div>
  )
}
