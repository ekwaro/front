import React from 'react'
import { Navbar, UserNavbar } from './Navbar'
import Clock from './Clock'

const Dashboard = () => {
  
  return (
    <div className='flex flex-col'>
      <div className='mb-4'>
        <Navbar/>

      </div>
      <div className='mt-9'>
       <Clock/>
      </div>
        
        
      
    </div>
  )
}


const UserDashboard = () => {
  return (
    <div className='flex flex-col'>
      <div className='mb-4'>
        <UserNavbar/>

      </div>
    <div className='mt-9'>
     <Clock/>
    </div>
      
      
    
  </div>
  )
}


export {Dashboard, UserDashboard}
