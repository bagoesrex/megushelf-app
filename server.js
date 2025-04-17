import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dbConfig } from "./config/db.js";

import bookRoutes from "./routes/bookRoutes.js";
import bookCategoryRoutes from "./routes/bookCategoryRoutes.js";

const app = express();
const PORT = 5000;

mongoose
  .connect(dbConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", bookCategoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
