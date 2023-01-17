import { body } from 'express-validator';

import { Errors } from '../consts/consts.js';

const isValidDate = (value) => {
  const date = new Date(value);
  if (date.toString() === Errors.INVALID_DATE) {
    throw new Error(Errors.INVALID_DATE);
  }
  const isFutureDate = Date.now() - date.getTime() < 0;
  if (isFutureDate) {
    throw new Error(Errors.INVALID_DATE);
  }
  return true;
};

export const createSaleValidator = [
  body('productId', Errors.MORE_ONE_SYMBOL).isString().isLength({ min: 1 }),
  body('store', Errors.MORE_ONE_SYMBOL).isString().bail().isLength({ min: 1 }),
  body('price', Errors.MORE_ZERO).isFloat({ gt: 0 }),
  body('name', Errors.MORE_ONE_SYMBOL).isString().bail().isLength({ min: 1 }),
  body('address', Errors.NOT_VALID_ADDRESS).isString(),
  body('category', Errors.MORE_ONE_SYMBOL)
    .isString()
    .bail()
    .isLength({ min: 1 }),
  body('soldItems', Errors.INTEGER).isInt({ min: 0 }),
  body('weight', Errors.MORE_ZERO).isFloat({ gt: 0 }),
  body('lastSale', Errors.INVALID_DATE).isString().bail().custom(isValidDate),
];

export const updateSaleValidator = [
  body('store', Errors.MORE_ONE_SYMBOL)
    .optional()
    .isString()
    .isLength({ min: 1 }),
  body('price', Errors.MORE_ZERO).optional().isFloat({ gt: 0 }),
  body('name', Errors.MORE_ONE_SYMBOL)
    .optional()
    .isString()
    .isLength({ min: 1 }),
  body('category', Errors.MORE_ONE_SYMBOL)
    .optional()
    .isString()
    .isLength({ min: 1 }),
  body('soldItems', Errors.INTEGER).optional().isInt({ min: 0 }),
  body('weight', Errors.MORE_ZERO).optional().isFloat({ gt: 0 }),
  body('address', Errors.NOT_VALID_ADDRESS).optional().isString(),
  body('lastSale', Errors.INVALID_DATE)
    .optional()
    .isString()
    .custom(isValidDate),
];
