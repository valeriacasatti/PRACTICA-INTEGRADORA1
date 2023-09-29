import { Router } from "express";
import { cartsService } from "../persistence/index.js";

const router = Router();

//create cart
router.post("/", async (req, res) => {
  try {
    const cart = await cartsService.createCart();
    res.json({ data: cart });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get all carts
router.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json({ data: carts });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//get cart id
router.get("/:cid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const cart = await cartsService.getCartById(cid);
    res.json({ data: `cart ID: ${cid}`, cart });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//agregar productos al arreglo del carrito seleccionado
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

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
      res.json({ message: "product added to cart successfully" });
    } else {
      res.json({ message: "error adding product to cart" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export { router as cartsRouter };
