import { connectionDB } from "../database/db.js";

export async function userMe(req, res) {
  const { authorization } = req.headers;

  try {
    const session = await connectionDB.query(
      "SELECT * FROM sessions WHERE token=$1",
      [authorization]
    );
    const userId = session.rows[0].userid;
    const user = await connectionDB.query("SELECT * FROM users WHERE id=$1", [
      userId,
    ]);
    if (!user) {
      res.status(404).send("Usuário não existe!");
    }
    const urls = await connectionDB.query(
      "SELECT * FROM urls WHERE userid=$1",
      [userId]
    );
    const [usera] = user.rows;
    delete usera.email;
    delete usera.password;
    //console.log(usera);

    const [urlsa] = urls.rows;
    delete urlsa.userid
    delete urlsa.createdat
    

    // const format = {
    //   id: 1,
    //   name: 1,
    //   visitCount: a,
    //   shortenedUrls: a,
    // };

    //console.log(user.rows)
    console.log(user.rows)
    console.log(urls.rows)
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function ranking(req, res) {}
