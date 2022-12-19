import registerSchema from "../models/registerSchema.js"
import  connectionDB from "../database/db.js"

export async function validSchemaRegister(req, res, next){
    const user = req.body

    const { error } = registerSchema.validate(user, {abortEarly: false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send({ errors })

    }

    const emailExist = await connectionDB.query(
        "SELECT * FROM users WHERE email=$1",
        [user.email]
    );

    if(emailExist.rowCount !== 0){
        return res.sendStatus(409);
    }

    res.locals.user = user;

    next();

}