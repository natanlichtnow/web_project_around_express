const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersPath = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
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

router.get('/:id', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Ocorreu um erro no servidor' });
      return;
    }
    try {
      const users = JSON.parse(data);
      const user = users.find((u) => u._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'ID do usuário não encontrado' });
        return;
      }
      res.send(user);
    } catch (e) {
      res.status(500).send({ message: 'Ocorreu um erro no servidor' });
    }
  });
});

module.exports = router;
