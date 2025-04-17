import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Create a new book
router.post("/books", async (req, res) => {
  const { title, author, publisher, published, category } = req.body;
  try {
    const newBook = new Book({ title, author, publisher, published, category });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book
router.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, publisher, published, category } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publisher, published, category },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
router.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get list of all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("category");
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Filter books by category
router.get("/books/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const books = await Book.find({ category: categoryId }).populate(
      "category"
    );
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Filter books by title, author, or publisher
router.get("/books/search", async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { publisher: { $regex: query, $options: "i" } },
      ],
    }).populate("category");
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Filter books by publication date range
router.get("/books/filter-by-date", async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const books = await Book.find({
      published: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("category");
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
