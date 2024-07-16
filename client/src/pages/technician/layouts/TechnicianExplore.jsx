import React from 'react'
import {Outlet} from 'react-router-dom'

 function TechnicianExplore() {


    //any component inside the wrapper will be passed to  the outlet here
  return (
    <div  className='w-full h-full'>
       <Sidebar/>
        <div className='bg-teal-200'>Header</div>
        <div>{<Outlet/>}</div> 
    </div>
  )
}

function Sidebar(){
return (
    <div className='bg-sky-100 flex h-screen bg-red-100'>
        <div className='flex flex-col'>
            <div className='flex-grow bg-pink-20'>
                this is the main content in the sidebar
            </div>
            <div className='mt-auto bg-red-100'>sedcondry content</div>
            <div className='flex-1 p-6 bg-pink-100'>sedcondry content</div>
        </div>
    </div>
)
}

export default TechnicianExplore;
