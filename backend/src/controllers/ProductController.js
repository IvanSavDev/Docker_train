import { validationResult } from 'express-validator';

import { Errors } from '../consts/consts.js';
import ProductModal from '../models/Product.js';
import { getFormatDate } from '../utils/utils.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModal.find({
      userId: req.userId,
    });

    if (!products) {
      return res.status(400).json({
        message: Errors.Get_products,
      });
    }

    const formattedProducts = products
      .map((product) => ({
        id: product._id,
        store: product.store,
        price: product.price,
        name: product.name,
        category: product.category,
        remains: product.remains,
        weight: product.weight,
        creationDate: getFormatDate(product.createdAt),
      }))
      .sort(
        (firstProduct, secondProduct) =>
          new Date(secondProduct.creationDate).getTime() -
          new Date(firstProduct.creationDate).getTime(),
      );

    res.json(formattedProducts);
  } catch (error) {
    console.log('products', error);
    res.status(500).json({ message: Errors.Get_products });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: Errors.Not_valid_product,
      });
    }

    const doc = new ProductModal({
      userId: req.userId,
      store: req.body.store,
      price: req.body.price,
      name: req.body.name,
      category: req.body.category,
      remains: req.body.remains,
      weight: req.body.weight,
    });

    const product = await doc.save();

    const {
      _id: id,
      store,
      price,
      name,
      category,
      remains,
      weight,
      createdAt: creationDate,
    } = product._doc;

    res.json({
      id,
      store,
      price,
      name,
      category,
      remains,
      weight,
      creationDate: getFormatDate(creationDate),
    });
  } catch (error) {
    console.log('Create product', error);
    res.status(500).json({ message: Errors.Create_product });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: Errors.Not_valid_product,
      });
    }

    const productId = req.params.id;

    const updatedProduct = await ProductModal.findByIdAndUpdate(
      productId,
      {
        ...req.body,
      },
      { new: true },
    );

    const {
      _id: id,
      store,
      price,
      name,
      category,
      remains,
      weight,
      createdAt: creationDate,
    } = updatedProduct;

    res.json({
      id,
      store,
      price,
      name,
      category,
      remains,
      weight,
      creationDate: getFormatDate(creationDate),
    });
  } catch (error) {
    console.log('Edit product', error);
    res.status(500).json({ message: Errors.Edit_product });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await ProductModal.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: Errors.Not_found_product });
    }
    res.json({
      success: true,
    });
  } catch (error) {
    console.log('Delete product', error);
    res.status(500).json({ message: Errors.Delete_product });
  }
};
