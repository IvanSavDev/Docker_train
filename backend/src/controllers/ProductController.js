import ProductModal from '../models/Product.js';
import { getFormatDate } from '../utils/utils.js';
import { ProductErrors } from '../consts/consts.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModal.find({
      userId: req.userId,
    });

    if (!products) {
      return res.status(404).json({
        message: ProductErrors.NOT_FOUND_PRODUCTS,
      });
    }

    const formattedProducts = [...products]
      .sort(
        (firstProduct, secondProduct) =>
          new Date(secondProduct.createdAt).getTime() -
          new Date(firstProduct.createdAt).getTime(),
      )
      .map((product) => ({
        id: product._id,
        store: product.store,
        price: product.price,
        name: product.name,
        address: product.address,
        category: product.category,
        remains: product.remains,
        weight: product.weight,
        creationDate: getFormatDate(product.createdAt),
      }));

    res.json(formattedProducts);
  } catch (error) {
    console.log('Get products', error);
    res.status(500).json({ message: ProductErrors.GET_PRODUCTS });
  }
};

export const createProduct = async (req, res) => {
  try {
    const doc = new ProductModal({
      userId: req.userId,
      store: req.body.store,
      price: req.body.price,
      address: req.body.address,
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
      address,
      category,
      remains,
      weight,
      createdAt: creationDate,
    } = product;

    res.json({
      id,
      store,
      price,
      name,
      address,
      category,
      remains,
      weight,
      creationDate: getFormatDate(creationDate),
    });
  } catch (error) {
    console.log('Create product', error);
    res.status(500).json({ message: ProductErrors.CREATE_PRODUCT });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await ProductModal.findOneAndUpdate(
      { _id: productId, userId: req.userId },
      {
        ...req.body,
      },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: ProductErrors.NOT_FOUND_PRODUCTS,
      });
    }

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
    console.log('Update product', error);
    res.status(500).json({ message: ProductErrors.UPDATE_PRODUCT });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await ProductModal.deleteOne({
      _id: productId,
      userId: req.userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: ProductErrors.NOT_FOUND_PRODUCT });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log('Delete product', error);
    res.status(500).json({ message: ProductErrors.DELETE_PRODUCT });
  }
};
