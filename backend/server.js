import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import path from "path";
dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());

//For Form Data
app.use(express.urlencoded({ extended: true }));

//Cookie Parser
app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Started On PORT ${PORT}`);
});
