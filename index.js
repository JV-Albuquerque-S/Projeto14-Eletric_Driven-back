import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
let db;

const app = express();
app.use(cors());
app.use(json());

app.get("/products", async (req, res) => {
    const mongoClient = new MongoClient(process.env.MONGO_API);

    try {
        await mongoClient.connect();
        db = mongoClient.db("eletric_driven");
        const produtos = await db.collection("products").find({}).toArray();
        res.send(produtos);
        mongoClient.close();
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
        mongoClient.close();
    }
});

app.listen(5000, () => {
    console.log("Servidor em pé, porta 5000");
});