import express  from "express";
import cors from "cors";
import dotenv from "dotenv"
import registerRouters from "./routers/registerRouters.js"
import urlsRouters from "./routers/urlsRouters.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(registerRouters)
app.use(urlsRouters)


const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`Server is running in port: ${port}`))