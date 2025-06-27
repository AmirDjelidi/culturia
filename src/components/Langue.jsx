import React, { useState } from 'react';
import axios from 'axios';
import './Langue.css';
import { useTranslation } from 'react-i18next';



function Langue() {
  const [selectedLang, setSelectedLang] = useState('Français');

  const { t, i18n } = useTranslation();
  const langMap = {
    Français: 'fr',
    English: 'en',
    Español: 'es',
    Português: 'pt',
    Deutsch: 'de',
    한국어: 'ko',
    中文: 'zh',
    Русский: 'ru'
  };



  const handleChange = async (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    const langCode = langMap[lang] || 'fr';

    try {
      i18n.changeLanguage(langCode);
      await axios.post('http://localhost:5000/api/langue', { langue: lang });
      console.log(`Langue envoyée au backend : ${lang}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la langue :", error);
    }
  };

  return (
    <div className="language">
      <h2>{t('langue.h2')}</h2>
      <p>{t('langue.p1')}</p>
      <div className="dropdown-wrapper">
        <select className="language-dropdown" value={selectedLang} onChange={handleChange}>
          <option value="Français">Français</option>
          <option value="English">English</option>
          <option value="Español">Español</option>
          <option value="Português">Português</option>
          <option value="Deutsch">Deutsch</option>
          <option value="한국어">한국어</option>
          <option value="中文">中文</option>
          <option value="Русский">Русский</option>
        </select>
      </div>
      <p>{t('langue.p2')}</p>
    </div>
  );
}

export default Langue;
