import { useState } from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Home from './components/home/Home.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
