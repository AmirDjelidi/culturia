const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');

router.post('/', analyzeController.analyzeImage);

let langueActuelle = 'Français';

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

module.exports = router;
