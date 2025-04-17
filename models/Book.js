import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    published: {
      type: Date,
      default: Date.now,
    },
    category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BookCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
