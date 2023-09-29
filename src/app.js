import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { productsService } from "./persistence/index.js";

import { connectDB } from "./config/dbConnection.js";

const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

const httpServer = app.listen(port, () =>
  console.log(`server running in port ${port}`)
);

const io = new Server(httpServer);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

io.on("connection", async (socket) => {
  try {
    console.log("client connected");
    const products = await productsService.getProduct();
    socket.emit("products", products);

    socket.on("addProduct", async (dataProduct) => {
      try {
        const productToSave = {
          title: dataProduct.title,
          description: dataProduct.description,
          price: dataProduct.price,
          code: dataProduct.code,
          stock: dataProduct.stock,
          status: dataProduct.status,
          category: dataProduct.category,
          thumbnail: dataProduct.imageName,
          imageBuffer: dataProduct.imageBuffer,
        };

        await productsService.addProduct(productToSave);

        const products = await productsService.getProduct();
        socket.emit("products", products);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("deleteProduct", async (id) => {
      try {
        await productsService.deleteProduct(id);
        const products = await productsService.getProduct();
        socket.emit("products", products);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
