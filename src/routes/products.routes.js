import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();

//get all products
router.get("/", async (req, res) => {
  try {
    const products = await productsService.getProduct();

    //limite de resultados
    const { limit } = req.query;
    const limitNumber = parseInt(limit);

    if (limit) {
      const productsLimit = products.slice(0, limitNumber);
      res.json({ productsLimit });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

//id product
router.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productsService.getProductById(pid);

    res.json({
      data: `product ID ${pid}:`,
      product,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//add product
router.post("/", async (req, res) => {
  try {
    const productInfo = req.body;
    const product = await productsService.addProduct(productInfo);
    if (product) {
      res.json({ message: `${productInfo.title} added successfully` });
    } else {
      res.json({ error: "error adding product..." });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

//update product
router.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const updatedContent = req.body;
    const product = await productsService.updateProduct(pid, updatedContent);
    if (product) {
      res.json({ message: "product updated successfully" });
    } else {
      res.json({ error: "error updating product..." });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

//delete product
router.delete("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productsService.deleteProduct(pid);
    if (product) {
      res.json({ message: "product deleted successfully" });
    } else {
      res.json({ error: "error deleting product..." });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export { router as productsRouter };
