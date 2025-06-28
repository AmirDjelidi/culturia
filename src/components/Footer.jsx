import React from 'react';
import './HeaderFooter.css';
import {useTranslation} from "react-i18next";

function Footer() {
    const { t, i18n } = useTranslation();
  return (
    <footer className="footer">
      <span>© CULTURIA - 2025</span>
    </footer>
  );
}

export default Footer;