import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publisher: {
      type: String,
      default: "",
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
