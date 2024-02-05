import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB();

const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Server Started</h1>");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Started On PORT ${PORT}`);
});
