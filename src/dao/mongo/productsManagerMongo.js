import { productsModel } from "./models/products.model.js";

export class ProductsManagerMongo {
  constructor() {
    this.model = productsModel;
  }

  async getProducts() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log(`get products error: ${error.message}`);
      throw new Error(`get products error: ${error.message}`);
    }
  }

  async addProduct(productInfo) {
    try {
      const result = await this.model.create(productInfo);
      return result;
    } catch (error) {
      console.log(`add product error: ${error.message}`);
      throw new Error(`add product error: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log(`get product by id error: ${error.message}`);
      throw new Error(`get product by id error: ${error.message}`);
    }
  }

  async updateProduct(id, updatedContent) {
    try {
      const result = await this.model.findByIdAndUpdate(id, updatedContent, {
        new: true,
      });
      if (!result) {
        throw new Error("product not found");
      } else {
        return result;
      }
    } catch (error) {
      console.log(`update product error: ${error.message}`);
      throw new Error(`update product error: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        throw new Error("product not found");
      } else {
        return result;
      }
    } catch (error) {
      console.log(`delete product error: ${error.message}`);
      throw new Error(`delete product error: ${error.message}`);
    }
  }
}
