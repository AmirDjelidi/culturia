import React, { useState, useEffect } from 'react';
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

  // ✅ Ajoute ce useEffect
  useEffect(() => {
    const fetchLangue = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/langue');
        const backendLang = response.data.langue;

        // Inverse mapping : code -> nom affiché
        const langEntry = Object.entries(langMap).find(([name, code]) => code === backendLang);
        const displayName = langEntry ? langEntry[0] : 'Français';

        setSelectedLang(displayName);
        i18n.changeLanguage(backendLang);

        console.log(`Langue initialisée depuis backend : ${displayName} (${backendLang})`);
      } catch (error) {
        console.error("Erreur récupération langue backend :", error);
      }
    };

    fetchLangue();
  }, [i18n]);

  const handleChange = async (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    const langCode = langMap[lang] || 'fr';

    try {
      i18n.changeLanguage(langCode);
      await axios.post('http://localhost:5000/api/langue', { langue: lang });
      console.log(`Langue envoyée au backend : ${lang} (${langCode})`);
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
