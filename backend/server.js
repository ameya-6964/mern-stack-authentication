import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Server Started</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Started On PORT ${PORT}`);
});
