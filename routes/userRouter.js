import { Router } from "express";

import { singUp } from "../controllers/userController.js";
// import { singUp, login } from "./../controllers/userController.js";
// import { singupValidation } from "../middlewares/singupValidationSchema.js";
// import { loginValidation } from "../middlewares/loginValidationSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", singUp);
// userRouter.post("/sign-up", singupValidation, singUp); 
// userRouter.post("/login",loginValidation, login);

export default userRouter;