const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const cardsPath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fs.readFile(cardsPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Ocorreu um erro no servidor' });
      return;
    }
    try {
      res.send(JSON.parse(data));
    } catch (e) {
      res.status(500).send({ message: 'Ocorreu um erro no servidor' });
    }
  });
});

module.exports = router;
