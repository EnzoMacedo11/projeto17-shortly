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
    const user = await connectionDB.query(
      "SELECT * FROM users WHERE id=$1",[userId]
    )
      await connectionDB.query(
        `UPDATE users SET "linksCount" = "linksCount" + 1 WHERE id=$1`,[userId]
      )
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
    const url = await connectionDB.query(`SELECT id,"shorturl",url FROM urls WHERE id=$1`, [
      id,
    ]);
    if (url.rowCount === 0) {
      return res.status(404).send("Url não encontrado!");
    }
    res.status(200).send( url.rows );
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
      if (short.rowCount === 0) {
        return res.status(404).send("ShortUrl não encontrado!")
      }
      await connectionDB.query(
        `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE shorturl=$1`,
        [shortUrl]
      );
      await connectionDB.query(
        `UPDATE users SET "visitCount" = "visitCount" + 1 WHERE id=$1`,[userid]
      )
      const Aurl = short.rows;
      const url = Aurl[0].url;
      //console.log("short.rowCount",short.rowCount)
      console.log("12",short.rows)
      console.log("userid", userid)
      //console.log("url",url)
     return res.redirect(url);
    
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
    
    const userId = session.rows[0].userid;
    const user = await connectionDB.query(
      "SELECT * FROM users WHERE id=$1",[userId]
    )
    await connectionDB.query(
      `UPDATE users SET "linksCount" = "linksCount" - 1 WHERE id=$1`,[userId]
    )
    console.log("user", user.rows[0].visitCount)
      const visitCountUser = user.rows[0].visitCount;
        

    //console.log("userid",userId)
    const url = await connectionDB.query("SELECT * FROM urls WHERE id=$1",[id])
    const viewsUrl = url.rows[0].visitCount
    console.log("viewsUrl",viewsUrl)
    //console.log("1",url.rowCount)
    if(url.rowCount === 0){
      return res.status(404).send()
    }
    const urlId = url.rows[0].userid;
    //console.log("urlId",urlId)
    //console.log("url",url)
     if(urlId === userId){
         await connectionDB.query(`UPDATE users SET "visitCount" = "visitCount" - ${viewsUrl} WHERE id=$1`,[userId] )
         await connectionDB.query("DELETE FROM urls WHERE id=$1",[id])
         return res.status(204).send()
    }  
     else{
       return res.status(401).send()
    }  
    
  }catch(err){
    res.status(500).send(err.message)
  }
}
