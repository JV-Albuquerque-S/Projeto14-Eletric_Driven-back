import { Router } from "express";

import { getProducts } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts);
//userRouter.post("/user-cart", ...);

export default productsRouter;