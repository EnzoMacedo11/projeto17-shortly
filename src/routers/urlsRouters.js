import { Router } from "express";
import { shorten,urlId,openShort,deleteId } from "..//controllers/urls.controllers.js";

const router = Router();

router.post("/urls/shorten", shorten)

router.get("/urls/:id", urlId)

router.get("/urls/open/:shortUrl", openShort)

router.delete("/urls/:id", deleteId)

export default router;