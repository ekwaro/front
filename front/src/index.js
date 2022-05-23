import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Dashboard, UserDashboard } from './components/Dashboard';
import Reset from './components/Reset';
import {Report, UserReport }from './components/Report';
import {Register, Login, EditUser} from './components/Users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  <BrowserRouter>
      <Routes>
          <Route path="/"  element={<App />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/reset" element={<Reset/>}/>
         
          <Route path="/report" element={<Report/>}/>
          <Route path="/userreport" element={<UserReport/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/userdashboard" element={<UserDashboard/>}/>
          <Route path="/edituser" element={<EditUser/>}/>

      </Routes>
    
  </BrowserRouter>
      
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
