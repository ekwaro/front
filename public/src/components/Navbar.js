// import react-hooks methods to handle the lifecycle processing of the application
import React, { useState,  useEffect } from 'react'
//link method and usenavigate life cycle hook for internal application navigation
import { Link, useNavigate} from 'react-router-dom'
// Auth and logout objects enable authentication ,db object is used to communicate with the remote firestore database
import { auth, db, logout } from '../firebase-config';
  
  
  const Navbar = () => {
    const navigate = useNavigate(); 
  //toggle the menu item
    const [isOpen, setIsOpen] = useState(false)

    const toggle =()=>{ 
      setIsOpen(!isOpen)
    }
    //in larger screens, hide the navigation lists
    useEffect(()=>{
      const hidemenu =()=>{
        if (window.innerWidth > 768 && isOpen){
          setIsOpen(false)
        }
      }
      window.addEventListener('resize', hidemenu) 
        return ()=>{
          window.removeEventListener('resize', hidemenu)
        }

      
    })
    
    const logout = async()=>{

      const res = await auth.signOut();
      if(res){alert('successfully logged out')
        {navigate("/login");}
     
    }      
    
    }
    return (
      <div >
        <nav className='flex px-4 mx-2 py-4 h-16 justify-between rounded items-center bg-green-500 text-white relative shadow-sm font-mono' role='navigation'>
            <div className='flex-col flex'>
              <h2 to="/" className='pl-8'>Clocking</h2>
              <p className='text-white pl-8'>{auth.currentUser.email}</p>             
                
            </div>
            <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h14' />
                  </svg>

            </div>            
          
            <div className='pr-8  md:block hidden flex flex-row justify-between items-center'>
                <Link className='px-4' to="/dashboard">Home</Link>
          
                <Link className='px-4' to="/report">Report</Link> 
             
          
           
                <Link className='px-4'  to="/register">Users</Link>
                <button onClick={logout}>Logout</button>
               
                
            </div>      

        </nav>
        <div className='w-1/3'>
         <Dropdown isOpen={isOpen} toggle={toggle}/>

        </div>
       
      </div>
    );
  }
  
  const Dropdown=({isOpen, toggle})=>{
    return(
      <div className={isOpen ? 'grid grid-rows-4 bg-green-400 text-white border-b text-center items-center':'hidden'} onClick={toggle}>
        <Link className='px-4' to="/dashboard">Home</Link>
          
        <Link className='px-4' to="/report">Report</Link> 
        <Link className='px-4' to="/edituser">Edit</Link>
   
    
        <Link className='px-4'  to="/register">Users</Link>
        <button onClick={logout}>Logout</button>
        
      </div>
    )
  }
const url = 'https://dominic-338308.web.app/'
const UserDropdown=({isOpen, toggle})=>{
    return(
      <div className={isOpen ? 'grid grid-rows-4 bg-green-400 text-white border-b text-center items-center':'hidden'} onClick={toggle}>
        <Link className='px-4' to="/userdashboard">Home</Link>
          
        <Link className='px-4' to="/report">Report</Link> 
      
        <button onClick={logout}>Logout</button>
        
      </div>
    )
  }
  
const UserNavbar = () => {
  const navigate = useNavigate();
  const[isOpen,setIsOpen] = useState(false)
  const toggle =()=>{ 
    setIsOpen(!isOpen)
  }
  useEffect(()=>{
    const hidemenu =()=>{
      if (window.innerWidth > 768 && isOpen){
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', hidemenu) 
      return ()=>{
        window.removeEventListener('resize', hidemenu)
      }

    
  })
  
  function Logouts(){
    const logout = auth.signOut();
    if(logout){
      navigate("/login");
    }
  }
  
    return (
      <div>
        <nav className='flex mx-2 rounded px-4 py-4 mx-2 justify-between items-center bg-green-500 text-white relative shadow-sm font-mono'>
            <div className='flex-col flex'>
                <h2 to="/" className='pl-8'>Clocking</h2>
                <p className='text-white pl-8'>{auth.currentUser.email}</p>

            </div>
            
            
            <div className='pr-8 md:block hidden'>
                <Link className='mx-5' to='/userdashboard'>Home</Link>
          
                <Link className='mx-5' to="/userreport">Report</Link>
                <button onClick={Logouts}>Logout</button>                       
                
                
                
            </div>   
            <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h14' />
                  </svg>

            </div> 
              

        </nav>
        <div className='w-1/3'>
         <UserDropdown  isOpen={isOpen} toggle={toggle}/>


        </div>
         
        
      </div>
    )
  }

  
export {Navbar, UserNavbar, Dropdown}
  