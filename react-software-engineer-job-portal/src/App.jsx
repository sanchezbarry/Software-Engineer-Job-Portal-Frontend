import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react'
import SiteHeader from './components/partials/SiteHeader';
import Search from './components/Search';
import Login from  './components/login/Login'
import Register from './components/register/Register'
import { ToastContainer } from 'react-toastify'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import Guest from './components/auth/Guest'
import NewJob from './components/newjob/NewJob'

function App() {
  return (
    <div className="App">

      <SiteHeader />
      

      <Routes>
        <Route path="/" element={<Home />} />
        {/*{ <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/edit" element={<Auth component={EditJobDetails} />} /> }*/}

        {/* should be Auth not Guest*/}
        <Route path="/employer" element={<Auth component={NewJob} />} /> 
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
