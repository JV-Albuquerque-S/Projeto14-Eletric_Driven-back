import { Router } from "express";

import { singUp, login, getUserCart } from "../controllers/userController.js";
import { singupValidation } from "../middlewares/signupValidation.js";
import { loginValidation } from "../middlewares/loginValidation.js";

const userRouter = Router(); 

userRouter.post("/sign-up", singupValidation, singUp);    
userRouter.post("/login", loginValidation, login);
userRouter.get("/user-cart", getUserCart);


export default userRouter;