import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from "./../db.js"

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
        const user = await db.collection("users").findOne({email: login.email }); 
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