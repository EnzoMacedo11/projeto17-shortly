import shortenSchema from "../models/shortenSchema.js"

export async function validSchemaRegister(req, res, next){
    const url = req.body

    const { error } = shortenSchema.validate(url, {abortEarly: false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send({ errors })

    }
    next();
}