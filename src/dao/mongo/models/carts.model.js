import mongoose, { Mongoose } from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

//find().populate("products.productId");

export const cartsModel = new mongoose.model(cartsCollection, cartSchema);
