import dotenv from "dotenv";

dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

console.log("Mongo URI: ", process.env.MONGO_URI);

import bookRoutes from "./routes/bookRoutes.js";
import bookCategoryRoutes from "./routes/bookCategoryRoutes.js";

const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {console.error("MongoDB connection error:", err)});

app.use(cors());
app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", bookCategoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
