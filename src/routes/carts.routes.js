import { Router } from "express";
import { cartsService } from "../dao/index.js";

const router = Router();

//get all carts
router.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json({ data: carts });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//add cart
router.post("/", async (req, res) => {
  try {
    const cartInfo = req.body;
    const cart = await cartsService.addCart(cartInfo);
    res.json({
      status: "success",
      message: "cart added successfully",
      data: cart,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get cart id
router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsService.getCartById(cid);
    res.json({ data: `cart ID: ${cid}`, cart });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//agregar productos al arreglo del carrito seleccionado
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    //verificar si el cart existe
    const cart = await cartsService.getCartById(cid);
    if (cart) {
      //verificar si el producto existe en el cart
      const productIndex = cart.products.findIndex(
        (product) => product.product === pid
      );
      if (productIndex !== -1) {
        //incrementar quantity del producto existente
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }
    }
    //update cart
    const updateCart = await cartsService.updateCart(cid, cart);
    if (updateCart) {
      res.json({
        status: "success",
        message: "product added to cart successfully",
      });
    } else {
      res.json({ status: "error", message: "error adding product to cart" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//delete cart
router.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    await cartsService.deleteCart(cid);
    res.json({
      status: "success",
      message: "cart deleted successfully",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export { router as cartsRouter };
