import { Router } from "express";
import { productsService } from "../dao/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.render("home", { products, style: "home.css" });
  } catch (error) {
    res.render({ message: error.message });
  }
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTime", { style: "realTime.css" });
});

router.get("/chat", (req, res) => {
  res.render("chat", { style: "chat.css" });
});

export { router as viewsRouter };
