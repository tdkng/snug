import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/AboutPage.jsx';
import Contact from './pages/ContactPage.jsx';
import Home from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Query from './pages/QueryPage.jsx';
import Signup from './pages/SignupPage.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="/query" element={<Query />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
