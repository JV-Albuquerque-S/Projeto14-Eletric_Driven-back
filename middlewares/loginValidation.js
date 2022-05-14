import joi from "joi";

export function loginValidation(req, res, next){
    const login = req.body;

    const userLoginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const validation = userLoginSchema.validate(login);
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }
    next();
}