import { connectionDB } from "../database/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export async function shorten(req, res){
    const {url} = req.body
    const shorturl = nanoid(8)
    try{
        await connectionDB.query("INSERT INTO urls (url,shorturl) VALUES ($1,$2)",[url,shorturl])
        res.status(201).send({shorturl})
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function urlId(req, res){}

export async function openShort(req, res){}

export async function deleteId(req, res){}

