import { ProductsManagerFiles } from "./productsManagerFiles.js";
import { CartsManagerFiles } from "./cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

//__dirname: carpeta src
export const productsService = new ProductsManagerFiles(
  path.join(__dirname, "files/products.json")
);
export const cartsService = new CartsManagerFiles(
  path.join(__dirname, "files/carts.json")
);
