import express from "express";

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`server is listining at port: 3000`);
});
