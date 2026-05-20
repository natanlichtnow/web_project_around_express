const auth = (req, res, next) => {
  req.user = { _id: '6555b31d52f19a01dfa32b31' };
  next();
};

module.exports = auth;
