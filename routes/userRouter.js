import { Router } from "express";

import { singUp, login } from "../controllers/userController.js";
import { singupValidation } from "../middlewares/signupValidation.js";
import { loginValidation } from "../middlewares/loginValidation.js";

const userRouter = Router(); 

userRouter.post("/sign-up", singupValidation, singUp);    
userRouter.post("/login", loginValidation, login);


export default userRouter;