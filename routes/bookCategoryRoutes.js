import express from "express";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

// Create a new book category
router.post("/bookcategories", async (req, res) => {
  const { categoryName } = req.body;
  try {
    const newCategory = new BookCategory({ categoryName });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book category
router.put("/bookcategories/:id", async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  try {
    const updatedCategory = await BookCategory.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book category
router.delete("/bookcategories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await BookCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get list of all book categories
router.get("/bookcategories", async (req, res) => {
  try {
    const categories = await BookCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
