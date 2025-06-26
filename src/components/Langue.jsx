import React, { useState } from 'react';
import axios from 'axios';
import './Langue.css';

function Langue() {
  const [selectedLang, setSelectedLang] = useState('Français');

  const handleChange = async (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    try {
      await axios.post('http://localhost:5000/api/langue', { langue: lang });
      console.log(`Langue envoyée au backend : ${lang}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la langue :", error);
    }
  };

  return (
    <div className="language">
      <h2>LANGUE</h2>
      <p>Choisissez votre langue préférée pour l'application :</p>
      <div className="dropdown-wrapper">
        <select className="language-dropdown" value={selectedLang} onChange={handleChange}>
          <option value="Français">Français</option>
          <option value="English">Anglais</option>
          <option value="Español">Espagnol</option>
          <option value="Português">Portugais</option>
          <option value="Deutsch">Allemand</option>
          <option value="한국어">Coréen</option>
          <option value="中文">Chinois</option>
          <option value="Русский">Russe</option>
        </select>
      </div>
      <p>La langue sélectionnée sera appliquée à l'interface utilisateur.</p>
    </div>
  );
}

export default Langue;
