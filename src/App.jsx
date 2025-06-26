import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CameraFrame from './components/CameraFrame';
import AboutUs from './components/AboutUs';
import Langue from './components/Langue';

function App() {
  return (
    <Router>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<CameraFrame />} />
          <Route path="/a-propos" element={<AboutUs />} />
          <Route path="/tutoriel" element={<div style={{ color: 'white' }}>Tutoriel à venir...</div>} />
          <Route path="/language" element={<Langue />} />      
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;