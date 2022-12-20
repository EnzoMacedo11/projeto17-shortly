import { Router } from "express";
import { shorten,urlId,openShort,deleteId } from "../controllers/urls.controllers.js";
import getToken from "../middlewares/authToken.middleware.js";
import {validSchemaRegister} from "../middlewares/shorten.middleware.js"

const router = Router();

router.post("/urls/shorten", validSchemaRegister, getToken, shorten)

router.get("/urls/:id", urlId)

router.get("/urls/open/:shortUrl", openShort)

router.delete("/urls/:id", deleteId)

export default router;