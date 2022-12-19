import { Router } from "express";
import { signIn,signUp } from "../controllers/register.controllers.js";
import {validSchemaRegister} from "../middlewares/register.middleware.js"

const router = Router();

router.post("/signup", validSchemaRegister, signUp)

router.post("/signin", signIn)

export default router;