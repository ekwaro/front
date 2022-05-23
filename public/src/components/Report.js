import React, {useEffect, useState}from 'react'
import { Navbar, UserNavbar } from './Navbar'
import { updateDoc, doc,getDocs, collection,deleteDoc,addDoc, where, query } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { async } from '@firebase/util';
import { TimeInOutTable, UserTimelogs } from './Tables';


const Report = () => {

  const  [users, setUsers] = useState([]);
  const timeCollectionRef = collection(db, "users" );

  useEffect(() =>{
    const getUsers = async() =>{
     const data = await getDocs(timeCollectionRef);
     console.log(data.docs);
     setUsers(data.docs.map((doc) =>({...doc.data()})));

    };


    

    getUsers();

  }, []);
  
  
const[ currentUsertime, setcurrentUserTime] = useState([]) 
    
  
const getUserTime=async(email)=>{
  const qs = query(collection(db, "pos"), where("email", "==", email));
  console.log(email)
  const data = await getDocs(qs)
  setcurrentUserTime(data.docs.map((doc) =>({...doc.data()})));
    
    
  
  console.log(data.docs.map((doc) =>({...doc.data()})))
  console.log(currentUsertime)
  
  
} 
console.log(currentUsertime)
  return (
    <div className=''>
        <Navbar/>
        <div className='flex pl-20 mt-20 container'>
            <div className=''>
                <h1 className='m-4'>Users</h1>
                <div className='flex flex-col bg-gray-50'>
                  <ul>
                 { users.map((user)=>{
                      return (
                        <button className='mt-2 border bg-white px-4 flex flex-col w-full rounded hover:bg-green-300 transition duration-300 ease-in-out pointer-cursor' onClick={()=>{getUserTime(user.email)}}>
                          <h1 className="text-slate-900 font-serif">Name: {user.name}</h1>
                          <h1 className='text-blue-400 font-serif my-1 text-xs'>Email: {user.email}</h1>
                                      
                                               
                      </button>
                      );
                    })}
                    
                  </ul>
                  
                           
                </div>

            </div>
            <div className='w-7/12 p-3 ml-7 rounded border'>
                <h1 className='p-3'>Logs for Oct/, 2016</h1>
                <div className='bg-gray-200'></div>
                <div className='flex justify-between items-center w-full'>
                  <TimeInOutTable usertime={currentUsertime}/>
                    

                </div>
                <div className='flex justify-between bg-gray-50'>

                </div>


            </div>
        </div>
      
    </div>
  )
}

const UserReport = () => {
 
  const  [timeLogs, settimelogs] = useState([]);
  const timeCollectionRef = collection(db, "pos" );


 

  useEffect(() =>{
    const getUsers = async() =>{
      const q = query(timeCollectionRef, where("email", "==", auth.currentUser.email))
     const data = await getDocs(q);
     console.log(data.docs);
     settimelogs(data.docs.map((doc) =>({...doc.data(), id: doc.id})));

    };

    getUsers();

  }, []);
  return (
    <div>
      <div>
      <UserNavbar />
      </div>
      <div className='flex pl-20 mt-20 container'>
            <div className=''>
                <h1 className='m-4 font-serif'>User</h1>
                <div className='flex flex-col bg-blue-200 rounded'>
                    <label className='m-2 font-serif'>Admin</label>
                    <p className='mx-2 mb-2 font-serif '>{auth.currentUser.email}</p>

                </div>

            </div>
            <div className='w-7/12 p-3 ml-7 rounded border'>
                <h1 className='p-3 font-serif'>Logs for Oct/, 2016</h1>
                <div className='bg-gray-200'></div>
                <div className='flex justify-between items-center w-full'>
                    <UserTimelogs timeLogs={timeLogs}/>

                </div>
                <div className='flex justify-between bg-gray-50'>

                </div>


            </div>
        </div>
      
                
      
      
    </div>
  )
}




export { Report, UserReport}
