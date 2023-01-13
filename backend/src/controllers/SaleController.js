import { validationResult } from 'express-validator';

import SaleModel from '../models/Sale.js';
import { Errors } from '../consts/consts.js';
import { getFormatDate } from '../utils/utils.js';

export const getSales = async (req, res) => {
  try {
    const sales = await SaleModel.find({
      userId: req.userId,
    });

    if (!sales) {
      return res.status(400).json({
        message: Errors.Not_found_sales,
      });
    }

    const formattedSales = sales.map((product) => ({
      id: product._id,
      store: product.store,
      price: product.price,
      name: product.name,
      category: product.category,
      remains: product.remains,
      weight: product.weight,
      creationDate: getFormatDate(product.createdAt),
    }));

    res.json(formattedSales);
  } catch (error) {
    console.log('products', error);
    res.status(500).json({ message: Errors.Get_sales });
  }
};

export const createSale = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        message: Errors.Not_valid_sale,
      });
    }
    console.log(req.body.productId);
    const doc = new SaleModel({
      userId: req.userId,
      productId: req.body.productId,
      store: req.body.store,
      price: req.body.price,
      name: req.body.name,
      category: req.body.category,
      soldItems: req.body.soldItems,
      weight: req.body.weight,
      lastSale: req.body.lastSale,
    });
    console.log(doc);
    const sale = await doc.save();

    const {
      _id: id,
      productId,
      store,
      price,
      name,
      category,
      soldItems,
      weight,
      createdAt: creationDate,
      lastSale,
    } = sale._doc;

    res.json({
      id,
      productId,
      store,
      price,
      name,
      category,
      soldItems,
      weight,
      creationDate: getFormatDate(creationDate),
      lastSale,
    });
  } catch (error) {
    console.log('Create sale', error);
    res.status(500).json({ message: Errors.Create_sale });
  }
};

export const updateSale = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: Errors.Not_valid_sale,
      });
    }

    const saleId = req.params.id;

    const updatedSale = await SaleModel.findByIdAndUpdate(
      saleId,
      {
        ...req.body,
      },
      { new: true },
    );

    const {
      _id: id,
      productId,
      store,
      price,
      name,
      category,
      soldItems,
      weight,
      createdAt: creationDate,
      lastSale,
    } = updatedSale;

    res.json({
      id,
      productId,
      store,
      price,
      name,
      category,
      soldItems,
      weight,
      creationDate: getFormatDate(creationDate),
      lastSale,
    });
  } catch (error) {
    console.log('Edit sale', error);
    res.status(500).json({ message: Errors.Edit_sale });
  }
};
