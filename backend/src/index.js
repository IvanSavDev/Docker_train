import express from 'express';
import mongoose from 'mongoose';

import {
  getUser,
  login,
  registration,
  updateUser,
} from './controllers/UserController.js';
import {
  createSale,
  getSales,
  updateSale,
} from './controllers/SaleController.js';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from './controllers/ProductController.js';
import checkAuth from './utils/checkAuth.js';
import { PORT, Routes } from './consts/consts.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import {
  createProductValidator,
  updateProductValidator,
} from './validations/productValidation.js';
import {
  loginValidator,
  registrationValidator,
  updateUserValidator,
} from './validations/userValidation.js';
import {
  createSaleValidator,
  updateSaleValidator,
} from './validations/saleValidation.js';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/crm')
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

app.use(express.json());

app.get(Routes.Sales, checkAuth, getSales);
app.post(
  Routes.Sale,
  checkAuth,
  createSaleValidator,
  handleValidationErrors,
  createSale,
);
app.patch(
  `${Routes.Sale}/:id`,
  checkAuth,
  updateSaleValidator,
  handleValidationErrors,
  updateSale,
);

app.get(Routes.Products, checkAuth, getProducts);
app.post(
  Routes.Product,
  checkAuth,
  createProductValidator,
  handleValidationErrors,
  createProduct,
);
app.patch(
  `${Routes.Products}/:id`,
  checkAuth,
  updateProductValidator,
  handleValidationErrors,
  updateProduct,
);
app.delete(`${Routes.Products}/:id`, checkAuth, deleteProduct);

app.get(Routes.User, checkAuth, getUser);
app.post(Routes.Login, loginValidator, handleValidationErrors, login);
app.post(
  Routes.Registration,
  registrationValidator,
  handleValidationErrors,
  registration,
);
app.post(
  Routes.User,
  checkAuth,
  updateUserValidator,
  handleValidationErrors,
  updateUser,
);

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  return console.log('Server ok');
});
