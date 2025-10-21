import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/shared/NavBar.jsx';
import About from './pages/AboutPage.jsx';
import Contact from './pages/ContactPage.jsx';
import Home from './pages/HomePage.jsx';
import Query from './pages/QueryPage.jsx';
import Login from './pages/LoginPage.jsx';
import LandingPage from './pages/LandingPage.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/query" element={<Query />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
