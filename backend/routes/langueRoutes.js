const express = require('express');
const router = express.Router();

let langueActuelle = 'Français'; // variable partagée temporaire

router.post('/api/langue', (req, res) => {
  const { langue } = req.body;
  if (langue) {
    langueActuelle = langue;
    console.log('Langue reçue :', langue);
    res.status(200).send({ message: 'Langue mise à jour.' });
  } else {
    res.status(400).send({ error: 'Langue manquante.' });
  }
});

router.get('/api/langue', (req, res) => {
  res.send({ langue: langueActuelle });
});

module.exports = { router, getLangue: () => langueActuelle };
