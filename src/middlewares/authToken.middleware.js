export function getToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Acesso Negado");
    }
    next()
  }

export default getToken;