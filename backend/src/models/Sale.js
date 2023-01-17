import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema(
  {
    store: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    soldItems: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    lastSale: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Sale', SaleSchema);
