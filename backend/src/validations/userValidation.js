import { body } from 'express-validator';
import bcrypt from 'bcrypt';

import UserModal from '../models/User.js';
import {
  EmailErrors,
  Errors,
  PasswordErrors,
  REG_PASSWORD,
} from '../consts/consts.js';

const isExistEmail = async (value) => {
  const user = await UserModal.findOne({ email: value });
  if (user) {
    throw new Error(EmailErrors.EMAIL_EXIST);
  }
};

const isValidOldPassword = async (value, { req }) => {
  const user = await UserModal.findOne({ _id: req.userId });

  const { passwordHash } = user._doc;

  const isValidPassword = await bcrypt.compare(
    req.body.oldPassword,
    passwordHash,
  );

  if (!isValidPassword) {
    throw new Error(PasswordErrors.EQUAL_OLD_PASSWORD);
  }
};

export const registrationValidator = [
  body('name', Errors.MORE_THREE_SYMBOLS).isLength({ min: 3 }),
  body('surname', Errors.MORE_THREE_SYMBOLS).isLength({ min: 3 }),
  body('companyName', Errors.MORE_ONE_SYMBOL).isLength({ min: 1 }),
  body('email', EmailErrors.INVALID_EMAIL).isEmail().custom(isExistEmail),
  body('password', PasswordErrors.INVALID_PASSWORD).matches(REG_PASSWORD),
  body('confirmPassword', PasswordErrors.CONFIRMED_PASSWORD).custom(
    (value, { req }) => value === req.body.password,
  ),
];

export const loginValidator = [
  body('email', EmailErrors.INVALID_EMAIL).isEmail(),
  body('password', PasswordErrors.INVALID_PASSWORD).matches(REG_PASSWORD),
];

export const updateUserValidator = [
  body('name', Errors.MORE_THREE_SYMBOLS).optional().isLength({ min: 3 }),
  body('surname', Errors.MORE_THREE_SYMBOLS).optional().isLength({ min: 3 }),
  body('companyName', Errors.MORE_ONE_SYMBOL).optional().isLength({ min: 1 }),
  body('email', EmailErrors.INVALID_EMAIL)
    .optional()
    .isEmail()
    .custom(isExistEmail),
  body('address', Errors.NOT_VALID_ADDRESS).optional().isString(),
  body('oldPassword')
    .optional()
    .custom((_, { req }) => req.body.newPassword)
    .withMessage(PasswordErrors.EMPTY_NEW_PASSWORD)
    .bail()
    .custom((value, { req }) => value !== req.body.newPassword)
    .withMessage(PasswordErrors.SAME_PASSWORD)
    .bail()
    .matches(REG_PASSWORD)
    .withMessage(PasswordErrors.INVALID_PASSWORD)
    .bail()
    .custom(isValidOldPassword),
  body('newPassword')
    .optional()
    .custom((_, { req }) => req.body.oldPassword)
    .withMessage(PasswordErrors.EMPTY_OLD_PASSWORD)
    .custom((value, { req }) => value !== req.body.oldPassword)
    .withMessage(PasswordErrors.SAME_PASSWORD)
    .bail()
    .matches(REG_PASSWORD)
    .withMessage(PasswordErrors.INVALID_PASSWORD),
];
