import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db/db.js";

const app = express();

app.use(express.json());

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is listining at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("database connection  failed", err);
  });
