const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Dados inválidos para criar cartão' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).json({ message: 'Cartão não encontrado' });
      }
      return res.json({ message: 'Cartão deletado com sucesso' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).json({ message: 'ID de cartão inválido' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).json({ message: 'Cartão não encontrado' });
      }
      return res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).json({ message: 'ID de cartão inválido' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).json({ message: 'Cartão não encontrado' });
      }
      return res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).json({ message: 'ID de cartão inválido' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
