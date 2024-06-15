import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a Tasks App API");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

export default app;
