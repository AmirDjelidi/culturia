import React from 'react';
import './HeaderFooter.css';

function Header() {
  return (
    <header className="header">
      <img src="/logo.png" alt="Logo Culturia" className="logo-img" />
      <div className="logo-text">CULTURIA</div>
      <div className="menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;