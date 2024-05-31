import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./src/routes/index.routes";
import { connect as redisConnect } from "./src/config/redisConnection";
import { connect as mongoConnect } from "./src/config/mongoConnection";

dotenv.config();

// redis connection

const app: Express = express();

redisConnect();
mongoConnect();

// const cors = require('cors');
// app.use(cors);
const port = process.env.PORT || 3000;

app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});