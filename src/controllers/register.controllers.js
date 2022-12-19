import { connectionDB } from "../database/db.js";

export async function signUp(req, res){
    const {name, email, password} = res.locals.user;

    try{
        await connectionDB.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",
        [name,email,password]);
    
        res.sendStatus(201)

    }catch(err){
        res.status(500).send(err.message)
    }

}

export async function signIn(req, res)