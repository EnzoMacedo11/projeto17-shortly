import { connectionDB } from "../database/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export async function shorten(req, res) {
  const { authorization } = req.headers;
  const { url } = req.body;
  //console.log("1", authorization)
  const shorturl = nanoid(8);
  try {
    const session = await connectionDB.query(
      "SELECT * FROM sessions WHERE token=$1",
      [authorization]
    );
    //console.log("2",session.rows)
    const userId = session.rows[0].userid;
    console.log("teste 2", session.rows[0].userid);
    await connectionDB.query(
      "INSERT INTO urls (url,shorturl,userid) VALUES ($1,$2,$3)",
      [url, shorturl, userId]
    );
    res.status(201).send({ shorturl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function urlId(req, res) {
  const { id } = req.params;
  try {
    const url = await connectionDB.query("SELECT * FROM urls WHERE id=$1", [
      id,
    ]);
    if (url.rowCount === 0) {
      return res.status(404).send("Url não encontrado!");
    }
    const data = url.rows;
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function openShort(req, res) {
  const { shortUrl } = req.params;
    console.log(shortUrl)
  try {
    const short = await connectionDB.query(
      "SELECT * FROM urls WHERE shorturl=$1",
      [String(shortUrl)]
    );
    const shortrows = short.rows[0]
    const userid = shortrows.userid
    if(shortUrl.length === 8){
      if (short.rowCount === 0) {
        return res.status(404).send("ShortUrl não encontrado!")
      }
      await connectionDB.query(
        "UPDATE urls SET cv = cv + 1 WHERE shorturl=$1",
        [shortUrl]
      );
      await connectionDB.query(
        "UPDATE users SET ctv = ctv + 1 WHERE id=$1",[userid]
      )
      const Aurl = short.rows;
      const url = Aurl[0].url;
      //console.log("short.rowCount",short.rowCount)
      console.log("12",short.rows)
      console.log("userid", userid)
      //console.log("url",url)
     return res.redirect(url);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteId(req, res) {
  const { id } = req.params;
  const { authorization } = req.headers;

  try{
    const session = await connectionDB.query(
        "SELECT * FROM sessions WHERE token=$1",
        [authorization]
      );
      if(!session){
        return res.status(404)
      }
    const userId = session.rows[0].userid;
    console.log(userId)
    const url = await connectionDB.query("SELECT * FROM urls WHERE id=$1",[id])
    const urlId = url.rows[0].userid;
    console.log(urlId)
    if(urlId === userId){
        await connectionDB.query("DELETE * FROM urls WHERE id=$1",[id])
        return res.status(204)
    }  
    else{
        return res.status(401)
    }  
  }catch(err){
    res.status(500).send(err.message)
  }
}
