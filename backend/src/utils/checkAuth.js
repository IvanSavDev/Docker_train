import jwt from 'jsonwebtoken';

import UserModal from '../models/User.js';
import { Errors, KEY_JWT } from '../consts/consts.js';

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: Errors.FAILED_AUTHORIZATION,
    });
  }

  try {
    const tokenWithoutScheme = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutScheme, KEY_JWT);
    const user = await UserModal.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(401).json({
        message: Errors.FAILED_AUTHORIZATION,
      });
    }
    req.userId = decoded._id;
  } catch (error) {
    return res.status(500).json({
      message: Errors.FAILED_AUTHORIZATION,
    });
  }

  next();
};
