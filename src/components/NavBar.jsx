import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useTranslation } from 'react-i18next';


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <header className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
      </Link>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <div></div><div></div><div></div>
      </div>
      <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>{t('menu.home')}</Link>
        <Link to="/language" onClick={() => setMenuOpen(false)}>{t('menu.language')}</Link>
        <Link to="/tutoriel" onClick={() => setMenuOpen(false)}>{t('menu.tutorial')}</Link>
        <Link to="/a-propos" onClick={() => setMenuOpen(false)}>{t('menu.about')}</Link>
      </nav>
    </header>
  );
}

export default NavBar;