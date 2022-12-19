import { connectionDB } from "../database/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signUp(req, res){
    const {name, email, password} = res.locals.user;
    const cryptPassword = bcrypt.hashSync(password, 10)

    try{
        await connectionDB.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",
        [name,email,cryptPassword]);
    
        res.sendStatus(201)

    }catch(err){
        res.status(500).send(err.message)
    }

}

export async function signIn(req, res){
    const user = req.body
    const {email, password} = req.body
    try{
        const registeredUser = await connectionDB.query("SELECT * FROM users WHERE email=$1",[email]);
        if(!registeredUser){
            return res.status(401).send("Usuário/Senha Inválidos!")
        }
        const { rows } = registeredUser
        console.log(registeredUser)
        console.log("teste1",registeredUser.rows)
        console.log("teste senha",rows[0].password)
        
        const returnPassword = bcrypt.compareSync(
            password,
            rows[0].password
        );
        console.log("teste senha!",returnPassword)
        console.log("teste senha body", password)
        if(!returnPassword){
            return res.status(401).send("Usuário/Senhas Inválidos!")
        }

        const token = uuid();
        await connectionDB.query("INSERT INTO sessions (token,email) VALUES ($1,$2)", [token,email]);
        res.status(200).send({token})

    }catch(err){
        res.status(500).send(err.message)
    }
}