const express = require('express');
const router = express.Router();

let langueActuelle = 'en'; // default code

router.post('/', (req, res) => {
  const { langue } = req.body; // ici tu reçois le nom affiché
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

  const langCode = langMap[langue] || 'en';

  langueActuelle = langCode;
  console.log('Langue reçue :', langue, '=> stockée code :', langCode);
  res.status(200).send({ message: 'Langue mise à jour.' });
});

router.get('/', (req, res) => {
  try {
    res.json({ langue: langueActuelle }); // renvoie code langue
  } catch (error) {
    console.error("Erreur getLangue :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = { router, getLangue: () => langueActuelle };

