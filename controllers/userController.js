import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from "./../db.js"

dotenv.config();

export async function singUp(req, res) {
    const user = req.body;
    try {
        const findUser = await db.collection("users").findOne({email : user.email});
        if (!findUser){
            await db.collection("users").insertOne({
                name: user.name,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10),
                phone: user.phone,
                cart: [] 

            });
            console.log("usuario cadastrado");
            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

export async function login(req, res) {
    const login = req.body;
    
    try {
        const user = await db.collection("users").findOne({ email: login.email }); 
        if (user && bcrypt.compareSync(login.password, user.password)){
            const data = { email: login.email };
            const secretKey = process.env.JWT_KEY;
            const token = jwt.sign(data, secretKey);
            await db.collection("sessions").insertOne({
                userId: user._id,
                token,
            });
            res.status(200).send({ token, name: user.name });
        } else {
            res.sendStatus(500);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getUserCart(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const secretKey = process.env.JWT_KEY;

    try {
        const tokenData = jwt.verify(token, secretKey);

        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }

        try {
            const user = await db.collection("users").findOne({ email: tokenData.email });;
            res.status(200).send(user.cart);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        }
    } catch {
        return res.sendStatus(401);
    }
}

export async function getUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const secretKey = process.env.JWT_KEY;

    try {
        const tokenData = jwt.verify(token, secretKey);

        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }

        try {
            const user = await db.collection("users").findOne({ email: tokenData.email });
            if (user){
                delete user.password;
                res.send(user);
            } else {
                res.sendStatus(401);
              }
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        }
    } catch {
        return res.sendStatus(401);
    }
}

export async function deleteUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const secretKey = process.env.JWT_KEY;

    try {
        const tokenData = jwt.verify(token, secretKey);

        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }

        try {
            await db.collection("users").deleteOne({ email: tokenData.email });
            res.sendStatus(200);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        }
    } catch {
        return res.sendStatus(401);
    }
}