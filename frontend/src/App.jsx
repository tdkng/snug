import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/about/About.jsx'
import Contact from './components/contact/Contact.jsx';
import Home from './components/home/Home.jsx'
import Query from './components/query/Query.jsx';
import NavBar from './components/shared/NavBar.jsx';
import Login from './components/auth/Login.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/query" element={<Query />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
