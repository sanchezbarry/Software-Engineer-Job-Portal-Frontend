import './App.css'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import SiteHeader from './components/partials/SiteHeader'
import Search from './components/Search'
import Login from  './components/login/Login'
import Register from './components/register/Register'
import { ToastContainer } from 'react-toastify'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import Guest from './components/auth/Guest'
import NewJob from './components/newjob/NewJob'
import Profile from './components/profile/Profile'
import EditJobDetails from './components/newjob/EditJobDetails'
import SiteFooter from './components/partials/SiteFooter'

function App() {
  return (
    <div className="App">

      <SiteHeader />
      

      <Routes>
        <Route path="/" element={<Home />} />
        {/*{ <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/edit" element={<Auth component={EditJobDetails} />} /> }*/}
        <Route path='/profile/:id' element={<Auth component={Profile} />} />
        <Route path='/jobs/:id/edit' element={<Auth component={EditJobDetails} />} /> 
        <Route path="/employer" element={<Auth component={NewJob} />} /> 
        <Route path="/jobs/:id" element={<Auth component={NewJob} />} /> 
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
        <Route path="/logout" />
      </Routes>

      <ToastContainer />

      <SiteFooter />
    </div>
  );
}

export default App;
