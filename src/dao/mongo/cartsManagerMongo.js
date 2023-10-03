import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  }

  //get carts
  async getCarts() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log(`get carts error: ${error.message}`);
      throw new Error(`get carts error: ${error.message}`);
    }
  }

  //add cart
  async addCart(cartInfo) {
    try {
      const result = await this.model.create(cartInfo);
      return result;
    } catch (error) {
      console.log(`add cart error: ${error.message}`);
      throw new Error(`add cart error: ${error.message}`);
    }
  }

  //get cart by ID
  async getCartById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log(`get cart by ID error: ${error.message}`);
      throw new Error(`get cart by ID error: ${error.message}`);
    }
  }
  async updateCart(id, updatedContent) {
    try {
      const result = await this.model.findByIdAndUpdate(id, updatedContent, {
        new: true,
      });
      if (!result) {
        throw new Error("cart not found");
      } else {
        return result;
      }
    } catch (error) {
      console.log(`update cart error: ${error.message}`);
      throw new Error(`update cart error: ${error.message}`);
    }
  }
  async deleteCart(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        throw new Error("cart not found");
      } else {
        return result;
      }
    } catch (error) {
      console.log(`delete cart error: ${error.message}`);
      throw new Error(`delete cart error: ${error.message}`);
    }
  }
}
