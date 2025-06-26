import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
      </Link>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <div></div><div></div><div></div>
      </div>
      <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>ACCUEIL</Link>
        <Link to="/language" onClick={() => setMenuOpen(false)}>LANGUE</Link>
        <Link to="/tutoriel" onClick={() => setMenuOpen(false)}>TUTORIEL MODE</Link>
        <Link to="/a-propos" onClick={() => setMenuOpen(false)}>À PROPOS DE NOUS</Link>
      </nav>
    </header>
  );
}

export default NavBar;