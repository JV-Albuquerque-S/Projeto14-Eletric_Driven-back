import { Router } from "express";

import { singUp, login } from "../controllers/userController.js";

// import { singupValidation } from "../middlewares/singupValidationSchema.js";
// import { loginValidation } from "../middlewares/loginValidationSchema.js";

const userRouter = Router(); //TODO: VAKIDATION SCHEMAS 

userRouter.post("/sign-up", singUp);
userRouter.post("/login", login);


export default userRouter;