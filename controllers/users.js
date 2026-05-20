const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).json({ message: 'Usuário não encontrado' });
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).json({ message: 'ID de usuário inválido' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Dados inválidos para criar usuário' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).json({ message: 'Usuário não encontrado' });
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Dados inválidos para atualizar perfil' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).json({ message: 'Usuário não encontrado' });
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'URL de avatar inválida' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro no servidor' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
