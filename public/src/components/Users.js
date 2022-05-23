import React, { useState, Fragment, useEffect, useCallback } from 'react'
import { Navbar } from './Navbar'
import { auth, registerWithEmailAndPassword, logInWithEmailAndPassword } from '../firebase-config';
import{ db} from '../firebase-config'
import { Transition, Dialog } from '@headlessui/react'
import { query, collection, getDocs, where , doc, deleteDoc, updateDoc} from "firebase/firestore";
import { Link, useNavigate} from 'react-router-dom'
import update from 'immutability-helper'
import * as yup from 'yup'
import {FlahMessage} from 'react-flash-message'
import {AddUserForm, EditUUser} from './form'
import {Tables} from './Tables';


// Create validation schema:
const formSchema = yup.object().shape({
  name:yup.string().required(),
  email:yup.string().email().required(),
  password:yup.string().required(),
  usertype: yup.string()
})


// Create the Register component:
const Register = () => {
  let [Isopen, setIsOpen] =useState(false);
 
  // Create state for form values:
  const [values, setValues] =useState({
    name:'', password:'', usertype:'',email:''
  })
  const [errors, setErrors] = useState({
    name:'false', password:'false', usertype:'false', email:'false'
  })
   

   // Create handler for input change event:
  const onFieldChange = useCallback((fieldName, value) =>{
    setValues((prevValues)=>update(
      prevValues,
      {[fieldName]:{
        $set:value},}))
  }, [])

   // Create handler for form submit event:

   const onSubmit = useCallback(async (event)=>{
     // Prevent form from submitting
     event.preventDefault()
     // Check the schema if form is valid:
     const isFormValid = await formSchema.isValid(values, {
      abortEarly: false, // Prevent aborting validation after first error
    })
    if (isFormValid) {
      // If form is valid, continue submission.
      registerWithEmailAndPassword(values.name,values.email, values.password, values.usertype);

      setIsOpen(false);
    }
    else {
      // If form is not valid, check which fields are incorrect:
      formSchema.validate(values, { abortEarly: false }).catch((err) => {
        // Collect all errors in { fieldName: boolean } format:
        const errors = err.inner.reduce((acc, error) => {
          return {
           ...acc,
           [error.path]: true,
          }
        },
       {})
          // Update form errors state:
          setErrors((prevErrors) =>
            update(prevErrors, {
              $set: errors,
            })
          )
        })
      }
    },
    [values]
  )
  
   
  const  [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users" );
  

  
  useEffect(() =>{
    const getUsers = async() =>{
     const data = await getDocs(usersCollectionRef);
     console.log(data.docs);
     setUsers(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
     

    };
    
    getUsers();

  }, []);
  const deleteUser= async(id)=>{
    const userdoc = doc(db, "users", id);
     const res = await deleteDoc(userdoc);
    if(res){<FlahMessage duration={3000}><strong>Deleted Successfully</strong></FlahMessage>}
  }
  const updateUser = async(id, user)=>{
    const userdoc = doc(db, "users", id);
    const newFields = {name:user.name, usertype:user.usertype};
    const res= await updateDoc(userdoc,newFields);
    if(res)alert('Successfully updated')
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

 
  //edit user component methods
  const [openEdit, setOpenEdit] = useState(false);
  const initialFormState = {id:null, fullname:'', usertype:''}
  const [currentUser, setcurrentUser] = useState(initialFormState)
 
  function closeEdit(){
    setOpenEdit(false)
  }
  const opensEdit=(user)=>{
    setOpenEdit(true)
    setcurrentUser({id:user.id, fullname:user.name, usertype:user.usertype})
    setOpenEdit(true)

  }

  return (
      <div>
        <Navbar/>
        <div className='flex flex-row justify-between m-8 mx-20'>
          <p className='text-2xl'>Users</p>        
          
          <button type="button" onClick={openModal} className="rounded-md bg-sky-700 relative  bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Add User
          </button>
            
        </div>
        <Transition appear show={Isopen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add User
                    
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className='flex flex-col mt-3 '>
                      <AddUserForm values={values} errors={errors} onFieldChange={onFieldChange} onSubmit={onSubmit}/>
                    
                    </div>                                      
                    
                  </div>

                  <div className="mt-4 flex flex-row justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
 
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> 

      <Transition appear show={openEdit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEdit}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   Edit User
                    
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className='flex flex-col mt-3 '>
                    <EditUser currentUser={currentUser} updateUser={updateUser} closeEdit={closeEdit} />
                    
                    
                    </div>                                      
                    
                  </div>

                  <div className="mt-4 flex flex-row justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeEdit}
                    >
                      Close
                    </button>
 
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> 
      <div className='mx-20'>
        <Tables users={users} deleteuser={deleteUser}  opensedit={opensEdit}/>

      </div>
      
     
      </div>     
    
  
  )
 }

  const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logr = async()=>{
    const login = logInWithEmailAndPassword(email,password);
    if (login){
  
      const qs = query(collection(db, "users"), where("email", "==", email));
      const getinfo = await getDocs(qs)
      const data = getinfo.docs.map(doc=>({...doc.data()}))
      if(data){
      data.forEach(item => {
        console.log(item.usertype.toLowerCase(), item.email)
        if(item.usertype.toLowerCase() === 'admin' ){navigate('/dashboard', {replace:true})}
        else if(item.usertype.toLowerCase() === 'user'){navigate('/userdashboard')}
        else{ navigate('/login')
        alert('You need to register first or correct your user role')}
        
      });}
      //const userform = data.usertype
      //alert(userform)
      //if(userform === 'admin'){
     
//}
      //else if(userform === 'user'){
      //  navigate('/userdashboard')

      //}
      //else{
       // navigate('/login')
       // alert('You need to register first or correct your user role')
      //}

    }
    
  }

 
return (
  <div className='border rounded flex flex-col w-2/4 h-3/4 mt-6  mx-auto border-red-100 bg-gray-200 shadow '>
      <h2 className='mx-auto mt-5 font-sans font-bold text-lg' >Sign In</h2>
      <input className='border p-4 m-6' type="email" value={email} placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)}></input>
      <input className='mt-0  p-4 mx-6 mb-6 rounded' type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={logr} className='bg-green-500 p-3 rounded mb-3 w-1/4 mx-auto text-white' >Login to clocking</button>
      
      <div className='mb-3 mx-auto'>
        <Link to="/reset">Forgot Password</Link>
        
      </div>
      
  </div>
);
}

const EditUser = (props) => {
  const [user, setUser] = useState(props.currentUser)
  const handleInputChange = (event)=>{
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }
  return (
    <div>
    
      <form className="mt-6  w-full " onSubmit={(event)=>{
        event.preventDefault()
        props.updateUser(user.id, user)
      }} >

        <div className='flex flex-col mt-3 '>
        <label className='font-serif  '> Name</label>
        <input type='text' onChange={handleInputChange} name='name' defaultValue={user.fullname} className='p-3 mt-3 bg-gray-100 rounded' style={{outline:'none'}}  placeholder='name'/>
        </div>
                
        <div className='flex flex-col my-3'>
        <label className='font-serif text-xs '> User Type</label>
        <input type='text' name='usertype' onChange={handleInputChange} defaultValue={user.usertype} className='bg-gray-100 p-3 my-3 rounded' style={{outline:'none'}}  placeholder='user-type'/>
        </div>
        <button  onClick={props.closeEdit} className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Edit User</button>
        
      </form>
      
    </div> 
  )
}


export  {Register, Login,EditUser }
