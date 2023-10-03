import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        idProduct: String,
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

export const cartsModel = new mongoose.model(cartsCollection, cartSchema);
