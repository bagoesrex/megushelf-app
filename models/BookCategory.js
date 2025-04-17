import mongoose from "mongoose";

const BookCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookCategory", BookCategorySchema);
