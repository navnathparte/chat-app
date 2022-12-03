import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv'
import mongoose from "mongoose";

const app = express();

dotenv.config()
const PORT = process.env.PORT;


const CONNECTION =process.env.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));