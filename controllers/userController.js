import bcrypt from 'bcrypt';


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