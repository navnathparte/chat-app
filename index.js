import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import constant from "./constants.js";
import bodyParser from "body-parser";
import cors from "cors";

// routes
import AuthRoute from './routes/AuthRoute.js'

const app = express();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())


config();
const PORT = constant.PORT;

const CONNECTION = constant.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  app.use('/auth', AuthRoute);