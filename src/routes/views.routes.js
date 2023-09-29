import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsService.getProduct();
    res.render("home", { products, style: "home.css" });
  } catch (error) {
    res.render({ error: error.message });
  }
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTime", { style: "realTime.css" });
});

export { router as viewsRouter };
