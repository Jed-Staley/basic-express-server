'use strict';

function validateName(req, res, next) {
  const name = req.query.name;
  if (!name) {
    throw new Error('Name is required');

  }
  next();
}

module.exports = { validateName };