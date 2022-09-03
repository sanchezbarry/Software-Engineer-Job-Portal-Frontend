import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react'
import SiteHeader from './components/partials/SiteHeader';
import Search from './components/Search';

function App() {
  return (
    <div className="App">

      <SiteHeader />
      <Search />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals/:animalId" element={<AnimalDetails />} />
        <Route path="/animals/:animalId/edit" element={<Auth component={EditAnimalDetails} />} />
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
