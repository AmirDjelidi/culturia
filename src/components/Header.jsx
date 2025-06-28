import React from 'react';
import './HeaderFooter.css';

function Header() {
  return (
    <header className="header">
      <img src="/images/logo.png" alt="Logo Culturia" className="logo-img" />
      <div className="logo-text">CULTURIA</div>

    </header>
  );
}

export default Header;