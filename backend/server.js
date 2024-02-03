import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Server Started</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Started On PORT ${PORT}`);
});
