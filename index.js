import express, {json} from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from "./routes/userRouter.js";
import productsRouter from "./routes/productsRouter.js";


const server = express();
server.use(json());
server.use(cors());
dotenv.config();

server.use(userRouter);
server.use(productsRouter);

server.listen(process.env.PORT, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`);
});