import express from 'express';
import mongoose from 'mongoose';
import {
  loginValidator,
  productValidator,
  registrationValidator,
  saleValidator,
} from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import { PORT, Routes } from './consts/consts.js';
import { login, registration } from './controllers/UserController.js';
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

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/crm')
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

app.use(express.json());

app.get(Routes.Sales, checkAuth, getSales);
app.post(Routes.Sale, checkAuth, saleValidator, createSale);
app.patch(`${Routes.Sale}/:id`, checkAuth, saleValidator, updateSale);

app.get(Routes.Products, checkAuth, getProducts);
app.post(Routes.Product, checkAuth, productValidator, createProduct);
app.patch(`${Routes.Products}/:id`, checkAuth, productValidator, updateProduct);
app.delete(`${Routes.Products}/:id`, checkAuth, deleteProduct);

app.post(Routes.Login, loginValidator, login);

app.post(Routes.Registration, registrationValidator, registration);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server ok');
});
