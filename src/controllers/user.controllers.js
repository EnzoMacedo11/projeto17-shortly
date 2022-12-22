import { connectionDB } from "../database/db.js";

export async function userMe(req, res) {
  const { authorization } = req.headers;

  try {
    const session = await connectionDB.query(
      "SELECT * FROM sessions WHERE token=$1",
      [authorization]
    );
    const userId = session.rows[0].userid;
    const user = await connectionDB.query(`SELECT id,name,"visitCount" FROM users WHERE id=$1`, [
      userId,
    ]);
    if (user.rowCount===0) {
      res.status(404).send("Usuário não existe!");
    }
    const urls = await connectionDB.query(
      `SELECT id,url,shorturl,"visitCount" FROM urls WHERE userid=$1`,
      [userId]
    );


    const format = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      visitCount: user.rows[0].visitCount,
      shortenedUrls: urls.rows
    };

    //console.log(format)
    //console.log(user.rows)
    //console.log(urls.rows)
    console.log(format)
    res.status(200).send(format)
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function ranking(req, res) {
  try{
    const ranking = await connectionDB.query(
      `SELECT id,name,"linksCount","visitCount" from users ORDER BY "visitCount" DESC LIMIT 10`
    )
    console.log(ranking.rows)
    res.status(200).send(ranking.rows)
  }catch(err){
    res.status(500).send(err.message)
}

 }
