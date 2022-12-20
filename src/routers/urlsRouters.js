import { Router } from "express";
import { shorten,urlId,openShort,deleteId } from "../controllers/urls.controllers.js";
import getToken from "../middlewares/authToken.middleware.js";
import {validSchemaShorten} from "../middlewares/shorten.middleware.js"

const router = Router();

router.post("/urls/shorten", validSchemaShorten, getToken, shorten)

router.get("/urls/:id", urlId)

router.get("/urls/open/:shortUrl", openShort)

router.delete("/urls/:id", getToken, deleteId)

export default router;