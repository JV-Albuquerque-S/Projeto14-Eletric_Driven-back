import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from "./../db.js"
import { ObjectId } from 'mongodb';

dotenv.config();

export async function getProducts(req, res){
    try {
        const produtos = await db.collection("products").find({}).toArray();
        res.send(produtos);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}