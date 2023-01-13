import { body } from 'express-validator';

export const registrationValidator = [
  body('name').isLength({ min: 3 }),
  body('surname').isLength({ min: 3 }),
  body('companyName').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('confirmPassword').custom(
    (value, { req }) => value === req.body.newPassword,
  ),
];

export const loginValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
];

export const userValidator = [
  body('name').isLength({ min: 3 }),
  body('surname').isLength({ min: 3 }),
  body('companyName').isLength({ min: 3 }),
  body('email').isEmail(),
  body('newPassword').isLength({ min: 5 }),
  body('oldPassword')
    .if((value, { req }) => req.body.newPassword)
    .if(body('newPassword').exists())
    .notEmpty()
    .custom((value, { req }) => value !== req.body.newPassword),
];

export const productValidator = [
  body('store').isString().isLength({ min: 1 }),
  body('price').isNumeric().isInt({ min: 0 }),
  body('name').isString().isLength({ min: 1 }),
  body('category').isString().isLength({ min: 1 }),
  body('remains').isInt({ min: 0 }),
  body('weight').isInt({ min: 0 }),
];

export const saleValidator = [
  body('productId').isString().isLength({ min: 1 }),
  body('store').isString().isLength({ min: 1 }),
  body('price').isNumeric().isInt({ min: 0 }),
  body('name').isString().isLength({ min: 1 }),
  body('category').isString().isLength({ min: 1 }),
  body('soldItems').isInt({ min: 0 }),
  body('weight').isInt({ min: 0 }),
  body('lastSale').isDate({
    format: 'DD.MM.YYYY',
    strictMode: true,
    delimiters: ['.'],
  }),
];
