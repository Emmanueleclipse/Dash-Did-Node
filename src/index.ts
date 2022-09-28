import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Resolve } from './handlers/resolve'

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || "8080";

app.use(bodyParser.json())
app.use(morgan('short'))

app.get("/1.0/identifiers/:identifier", Resolve)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
