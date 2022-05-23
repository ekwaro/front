import React, { useState } from 'react'
import { auth, db } from '../firebase-config';
import{query, collection,addDoc, where, getDocs, setDoc,doc,updateDoc, Timestamp} from '@firebase/firestore';


class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {time: new Date(),  usertype:'',timeIn :'timein',docuid:'', Istimeout:false};
    this.handleClick = this.handleClick.bind(this);
    this.timeCollection = collection(db, "pos");
    this.handleTimeOutUpdate = this.handleTimeoutUpdate.bind(this)
  }
  componentDidMount(){
    this.intervalID =setInterval(()=>this.tick(), 1000);
    
  }
  componentWillUnmount(){
    clearInterval(this.intervalID);
  }
  timeIn = async () =>{   
    auth.onAuthStateChanged(function(user){
      if(user){
        alert("user logged In")
    }        
      else{
        alert('user doesnot exists')
      }
    })
    const create_time_user = await addDoc(this.timeCollection, {CreatedAt: new Date().getTime() , email: auth.currentUser.email, displayname:auth.currentUser.displayName, timeout:'' });
    this.setState({docuid: create_time_user.id})
    alert(this.state.docuid)
    if(create_time_user){
      

      this.setState({docuid: create_time_user.id})
      alert(this.state.docuid)
      
    
    }  
  }
 
  updateTime=async()=>{

    const userdoc = doc(db, "pos" , this.state.docuid);
    alert(this.state.docuid)
  
    const updateusertime = await updateDoc(userdoc, {timeout: new Date().getTime()} )

   
    if(updateusertime){
      alert("You have registered your time successfully")
      
    } 
    
  }
  handleTimeoutUpdate(){
    this.updateTime();
    this.setState({timeIn: 'timein'})
    this.setState({docuid:''})
  }

     
  tick(){
    this.setState({time: new Date()});
  }
  handleClick(){
    this.setState({timeIn: !'timein'})
     this.timeIn();
  }
 
   render(){
     if(this.state.timeIn === 'timein'){
      return (
        <div className='bg-gray-400 h-3/4 mx-12 min-h-full flex flex-col justify-center items-center pb-6 rounded'>
          <h1 className='lg:text-4xl md:text-3xl sm:text-xl text-3xl text-white font-mono mb-12 mt-7'>Date:{'' +this.state.time.toDateString()}</h1>
          <h1 className='lg:text-4xl md:text-3xl sm:text-xl text-3xl text-white font-mono mb-12'>Time:{'' +this.state.time.toLocaleTimeString()}</h1>

          <button onClick={this.handleClick} className='py-5 font-mono px-5 bg-green-500 rounded text-3xl hover:bg-green-300 transition duration-300 ease-in-out flex items-center'>
              Time In
               
          </button>
              
        </div>
      );
  
     }

     else{
      return (
        <div className='bg-gray-400 h-3/4 mx-12 min-h-full flex flex-col justify-center items-center pb-6 rounded'>
          <h1 className='lg:text-4xl md:text-3xl sm:text-xl text-3xl text-white font-mono mb-12 mt-7'>Date:{'' + this.state.time.toDateString()}</h1>
          <h1 className='lg:text-4xl md:text-3xl sm:text-xl text-3xl text-white font-mono mb-12'>Time:{'' +this.state.time.toLocaleTimeString()}</h1>
          
          
          <button onClick={ this.handleTimeOutUpdate} className='py-6 font-mono px-10 bg-red-500 rounded text-3xl hover:bg-green-300 transition duration-300 ease-in-out flex items-center'>Time Out</button>
        </div>
      );
  
     }
    
    
  }
}


export default Clock
