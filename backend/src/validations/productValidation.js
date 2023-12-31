import { body } from 'express-validator';

import { Errors } from '../consts/consts.js';

export const createProductValidator = [
  body('store', Errors.MORE_ONE_SYMBOL).isString().isLength({ min: 1 }),
  body('price', Errors.INTEGER).isInt({ min: 0 }),
  body('name', Errors.MORE_ONE_SYMBOL).isString().isLength({ min: 1 }),
  body('address', Errors.NOT_VALID_ADDRESS).isString(),
  body('category', Errors.MORE_ONE_SYMBOL).isString().isLength({ min: 1 }),
  body('remains', Errors.INTEGER).isInt({ min: 0 }),
  body('weight', Errors.INTEGER).isInt({ min: 0 }),
];

export const updateProductValidator = [
  body('store', Errors.MORE_ONE_SYMBOL)
    .optional()
    .isString()
    .isLength({ min: 1 }),
  body('price', Errors.INTEGER).optional().isInt({ min: 0 }),
  body('address', Errors.NOT_VALID_ADDRESS).optional().isString(),
  body('name', Errors.MORE_ONE_SYMBOL)
    .optional()
    .isString()
    .isLength({ min: 1 }),
  body('category', Errors.MORE_ONE_SYMBOL)
    .optional()
    .isString()
    .isLength({ min: 1 }),
  body('remains', Errors.INTEGER).optional().isInt({ min: 0 }),
  body('weight', Errors.INTEGER).optional().isInt({ min: 0 }),
];
