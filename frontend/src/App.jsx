import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/AboutPage.jsx';
import Contact from './pages/ContactPage.jsx';
import Home from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/LoginPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Signup from './pages/SignupPage.jsx';
import Query from './pages/QueryPage.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/query" element={<Query />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
