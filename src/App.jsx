import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
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
  // const profile = (<SiteHeader id={} showViewButton={true} />)

  return (
  
    <div className="App">

      <SiteHeader />
      

      <Routes>
        <Route path={`${process.env.REACT_APP_HOME}`} element={<Home />} />
        {/*{ <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/edit" element={<Auth component={EditJobDetails} />} /> }*/}
        <Route path={`${process.env.REACT_APP_HOME}/profile/:id`} element={<Auth component={Profile} />} />
        <Route path={`${process.env.REACT_APP_HOME}/jobs/:id/edit`} element={<Auth component={EditJobDetails} />} /> 
        <Route path={`${process.env.REACT_APP_HOME}/employer`} element={<Auth component={NewJob} />} /> 
        <Route path={`${process.env.REACT_APP_HOME}/jobs/:id`} element={<Auth component={NewJob} />} /> 
        <Route path={`${process.env.REACT_APP_HOME}/register`} element={<Guest component={Register} />} />
        <Route path={`${process.env.REACT_APP_HOME}/login`} element={<Guest component={Login} />} />
        <Route path={`${process.env.REACT_APP_HOME}/logout`} />
      </Routes>

      <ToastContainer />

      <SiteFooter />
    </div>
  );
}

export default App;


{/* <Route path='/Software-Engineer-Job-Portal-Frontend/profile/:id' element={<Auth component={Profile} />} />
        <Route path='/Software-Engineer-Job-Portal-Frontend/jobs/:id/edit' element={<Auth component={EditJobDetails} />} /> 
        <Route path="/Software-Engineer-Job-Portal-Frontend/employer" element={<Auth component={NewJob} />} /> 
        <Route path="/Software-Engineer-Job-Portal-Frontend/jobs/:id" element={<Auth component={NewJob} />} /> 
        <Route path="/Software-Engineer-Job-Portal-Frontend/register" element={<Guest component={Register} />} />
        <Route path="/Software-Engineer-Job-Portal-Frontend/login" element={<Guest component={Login} />} />
        <Route path="/Software-Engineer-Job-Portal-Frontend/logout" /> */}