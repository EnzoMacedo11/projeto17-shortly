import { Router } from "express";
import { userMe, ranking } from "../controllers/user.controllers.js";
import getToken from "../middlewares/authToken.middleware.js";

const router = Router();

router.get("/users/me", getToken, userMe)

router.get("/ranking", ranking)


export default router;