import React from 'react'
//Table to display the users in the clocking system
const Tables = (props) => {
  return (
    <div className='mx-20'>
       <table className=' shadow-lg w-full bg-blue border-collapse overflow-x-auto'>
          <thead className='bg-blue-300 rounded '>
            <tr className='p-4 border'>
              <th className='border text-left px-8 py-2 '>Name</th>
              <th className='border text-left px-8 py-2 '>Email</th>
              <th className='border text-left px-8 py-2 '>CreatedAt</th>
              <th className='border text-left px-8 py-2 '>Role</th>
              <th className='border text-left px-8 py-2 '>Action</th>
            </tr>       
        
          </thead>
          <tbody className=''>
            {props.users.map((user)=>{
                return ( 
                <>  
                <tr className=' '>
                  <td className='px-8 py-4 border rounded'>{user.name}</td>
                  <td className='px-8 py-4 border rounded'>{user.email}</td>
                  <td className='px-8 py-4 border rounded'>{new Date(user.CreatedAt).toLocaleDateString()}</td>
                  <td className='px-8 py-4 border rounded'>{user.usertype}</td>
                  <td className='px-8 py-4 border rounded'>
                    <button  className='bg-green-200  rounded  text-white px-4 py-2 mr-2 ' onClick={()=>{props.opensedit(user)}}>Edit</button>
                    <button className='bg-red-200  rounded  text-white px-4 py-2' onClick={()=>{props.deleteuser(user.id)}}>Delete</button>
                  </td>
                </tr>             
               
                </>
                )
              })
              }
            
          </tbody>

        </table>
    </div>
  )
}
//Table used by the admin to view the employee attendences
//the props come from the usertime state of the Report component from the report.js file
const TimeInOutTable = (props) => {
  return (
    <div className='mx-20'>
       <table className=' shadow-lg w-full bg-blue border-collapse overflow-x-auto'>
          <thead className='bg-white rounded '>
            <tr className='p-4 border'>
              <th className='border text-left px-8 py-2 '>Date</th>
              <th className='border text-left px-8 py-2 '>TimeIn</th>
              <th className='border text-left px-8 py-2 '>TimeOut</th>
            </tr>       
          </thead>
          <tbody >
              {props.usertime == null ?'nothing to render':props.usertime.map((user)=>{
                return ( 
                <>  
                <tr className=' '>
                  <td className='px-8 py-4 border rounded'>{new Date(user.CreatedAt).toLocaleDateString()}</td>
                  <td className='px-8 py-4 border rounded'>{new Date(user.CreatedAt).toLocaleTimeString()}</td>
                  <td className='px-8 py-4 border rounded'>{new Date(user.timeout).toLocaleTimeString()}</td>          
                </tr>             
                </>
                )
              })
              }
            
          </tbody>

        </table>
    </div>
  )
}

//this table component is used by the normal user(company employee to view his own attendence logs)
const UserTimelogs = (props) => {
  return (
    <div>
        <table className=' shadow-lg w-full border-collapse overflow-x-auto'>
          <thead className='bg-blue-300 rounded '>
            <tr className='p-4 border'>
              <th className='border text-left px-8 py-2 '>Date</th>
              <th className='border text-left px-8 py-2 '>TimeIn</th>
              <th className='border text-left px-8 py-2 '>TimeOut</th>
          </tr>                  
          </thead>
          <tbody >
            {props.timeLogs == null ?<p className='font-serif  text-2xl'>No user Info found</p>:props.timeLogs.map((user)=>{
                return ( 
                <>  
                <tr className=' '>
                  <td className='px-8 py-4 border rounded'>{new Date(user.CreatedAt).toLocaleDateString()}</td>
                  <td className='px-8 py-4 border rounded'>{new Date(user.CreatedAt).toLocaleTimeString()}</td>
                  <td className='px-8 py-4 border rounded'>{new Date(user.timeout).toLocaleTimeString()}</td>
                          
                </tr>                  
                </>
                )
              })
              }  
          </tbody>

        </table>
      
    </div>
  )
}
export {Tables, TimeInOutTable, UserTimelogs}
