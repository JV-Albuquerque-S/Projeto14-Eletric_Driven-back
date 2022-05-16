import { Router } from "express";

import { singUp, login, getUser, getUserCart, deleteUser } from "../controllers/userController.js";
import { singupValidation } from "../middlewares/signupValidation.js";
import { loginValidation } from "../middlewares/loginValidation.js";

const userRouter = Router(); 

userRouter.post("/sign-up", singupValidation, singUp);    
userRouter.post("/login", loginValidation, login);
userRouter.get("/user", getUser);
userRouter.get("/user-cart", getUserCart);
userRouter.delete("/delete-user", deleteUser);


export default userRouter;