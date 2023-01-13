import jwt from 'jsonwebtoken';

import { Errors, KEY_JWT } from '../consts/consts.js';

export default (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: Errors.Permission_denied,
    });
  }

  try {
    const tokenWithoutScheme = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutScheme, KEY_JWT);
    req.userId = decoded._id;
  } catch (error) {
    return res.status(403).json({
      message: Errors.Permission_denied,
    });
  }

  next();
};
