import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

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
import {
  loadBackgroundImage,
  loadImage,
} from './controllers/ImageController.js';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/crm')
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json({ limit: '50mb' }));
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));

app.get(Routes.SALES, checkAuth, getSales);
app.post(
  Routes.SALE,
  checkAuth,
  createSaleValidator,
  handleValidationErrors,
  createSale,
);
app.patch(
  `${Routes.SALES}/:id`,
  checkAuth,
  updateSaleValidator,
  handleValidationErrors,
  updateSale,
);

app.get(Routes.PRODUCTS, checkAuth, getProducts);
app.post(
  Routes.PRODUCT,
  checkAuth,
  createProductValidator,
  handleValidationErrors,
  createProduct,
);
app.patch(
  `${Routes.PRODUCTS}/:id`,
  checkAuth,
  updateProductValidator,
  handleValidationErrors,
  updateProduct,
);
app.delete(`${Routes.PRODUCTS}/:id`, checkAuth, deleteProduct);

app.get(Routes.USER, checkAuth, getUser);
app.post(Routes.LOGIN, loginValidator, handleValidationErrors, login);
app.post(
  Routes.REGISTRATION,
  registrationValidator,
  handleValidationErrors,
  registration,
);
app.patch(
  Routes.USER,
  checkAuth,
  updateUserValidator,
  handleValidationErrors,
  updateUser,
);

app.post(Routes.UPLOAD_AVATAR, checkAuth, upload.single('image'), loadImage);
app.post(
  Routes.UPLOAD_BACKGROUND,
  checkAuth,
  upload.single('image'),
  loadBackgroundImage,
);

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  return console.log('Server ok');
});
