import SaleModel from '../models/Sale.js';

import ProductModal from '../models/Product.js';
import { ProductErrors, SaleErrors } from '../consts/consts.js';
import { getFormatDate } from '../utils/utils.js';

export const getSales = async (req, res) => {
  try {
    const sales = await SaleModel.find({
      userId: req.userId,
    });

    if (!sales) {
      return res.status(404).json({
        message: SaleErrors.NOT_FOUND_SALES,
      });
    }

    const formattedSales = [...sales]
      .sort(
        (firstSale, secondSale) =>
          new Date(secondSale.lastSale).getTime() -
          new Date(firstSale.lastSale).getTime(),
      )
      .map((sale) => ({
        id: sale._id,
        productId: sale.productId,
        store: sale.store,
        price: sale.price,
        name: sale.name,
        category: sale.category,
        soldItems: sale.soldItems,
        weight: sale.weight,
        lastSale: getFormatDate(sale.lastSale),
        creationDate: getFormatDate(sale.createdAt),
      }));

    res.json(formattedSales);
  } catch (error) {
    console.log('Get sales', error);
    res.status(500).json({ message: SaleErrors.GET_SALES });
  }
};

export const createSale = async (req, res) => {
  try {
    const product = await ProductModal.findOne({
      _id: req.body.productId,
      userId: req.userId,
    });

    if (!product) {
      return res.status(404).json({ message: ProductErrors.NOT_FOUND_PRODUCT });
    }

    const doc = new SaleModel({
      userId: req.userId,
      productId: req.body.productId,
      store: req.body.store,
      price: req.body.price,
      name: req.body.name,
      address: req.body.address,
      category: req.body.category,
      soldItems: req.body.soldItems,
      weight: req.body.weight,
      lastSale: req.body.lastSale,
    });

    const sale = await doc.save();

    const {
      _id: id,
      productId,
      store,
      price,
      name,
      address,
      category,
      soldItems,
      weight,
      createdAt: creationDate,
      lastSale,
    } = sale;

    res.json({
      id,
      productId,
      store,
      price,
      name,
      address,
      category,
      soldItems,
      weight,
      creationDate: getFormatDate(creationDate),
      lastSale: getFormatDate(lastSale),
    });
  } catch (error) {
    console.log('Create sale', error);
    res.status(500).json({ message: SaleErrors.CREATE_SALE });
  }
};

export const updateSale = async (req, res) => {
  try {
    const saleId = req.params.id;

    const updatedSale = await SaleModel.findOneAndUpdate(
      { _id: saleId, userId: req.userId },
      {
        ...req.body,
      },
      { new: true },
    );

    if (!updatedSale) {
      return res.status(404).json({
        message: SaleErrors.NOT_FOUND_SALE,
      });
    }

    const {
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
      store,
      price,
      name,
      category,
      soldItems,
      weight,
      creationDate: getFormatDate(creationDate),
      lastSale: getFormatDate(lastSale),
    });
  } catch (error) {
    console.log('Update sale', error);
    res.status(500).json({ message: SaleErrors.UPDATE_SALE });
  }
};
