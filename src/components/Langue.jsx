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


  useEffect(() => {
    const detectAndSetLanguage = async () => {
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

      const supportedLangs = Object.values(langMap); // ['fr', 'en', ...]

      // 🧠 1. Détection langue système
      const systemLang = navigator.language?.split('-')[0] || 'en';
      console.log(systemLang);

      // 🛡️ 2. Vérifie si supportée
      const langCode = supportedLangs.includes(systemLang) ? systemLang : 'en';

      // 🔄 3. Nom d'affichage (Français, English, etc.)
      const displayLangEntry = Object.entries(langMap).find(([label, code]) => code === langCode);
      const displayName = displayLangEntry ? displayLangEntry[0] : 'English';

      // 🔧 4. Mise à jour interface
      setSelectedLang(displayName);
      i18n.changeLanguage(langCode);

      try {
        await axios.post('https://culturia.onrender.com/api/langue', { langue: langCode });
        console.log(`✅ Langue système détectée et envoyée : ${langCode}`);
      } catch (err) {
        console.error("❌ Erreur lors de l'envoi de la langue système :", err);
      }
    };

    detectAndSetLanguage();
  }, [i18n]);


  const handleChange = async (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    const langCode = langMap[lang] || 'fr';

    try {
      i18n.changeLanguage(langCode);
      await axios.post('https://culturia.onrender.com/api/langue', { langue: lang });
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
