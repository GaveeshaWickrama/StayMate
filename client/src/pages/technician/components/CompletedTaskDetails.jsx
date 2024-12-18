import React from 'react'

function CompletedTaskDetails({complaint}) {
  return (


    <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
    {complaint.status === "jobCompleted" && (
      <div className="m-3 p-1">
        <p className="text-lg">You successfully completed this job</p>
        <div className="bg-green-100 m-3 p-5 rounded-lg">
          <p>
            Assigned Date: {complaint?.assignedDate
    ? new Date(complaint.assignedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available'}<br />
            Completion Date: {complaint?.taskCompletedDate
    ? new Date(complaint.taskCompletedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available'} <br />
          
          </p>
        </div>
      </div>
    )}

    {complaint.status === "technicianCompleted" && (
      <div className="m-3 p-1">
        <p className="text-lg">Awaiting Proof confirmation by the host</p>
      </div>
    )}
  </div>
  )
}

export default CompletedTaskDetails



