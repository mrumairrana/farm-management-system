const express = require("express");
const Animal = require("../models/Animal");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all animals across all farms or user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const animals = await Animal.find().sort({ createdAt: -1 });
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching animals", error: error.message });
  }
});

// Create a new animal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const animalData = req.body;
    const newAnimal = new Animal(animalData);
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: "This animal ID is already in use. Animal ID must be unique." });
    }
    res.status(500).json({ message: "Error creating animal", error: error.message });
  }
});

// Update animal
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnimal) return res.status(404).json({ message: "Animal not found" });
    res.status(200).json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ message: "Error updating animal", error: error.message });
  }
});

// Delete animal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal) return res.status(404).json({ message: "Animal not found" });
    res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting animal", error: error.message });
  }
});

// Get all animals for a specific farm
router.get("/farm/:farmId", authMiddleware, async (req, res) => {
  try {
    const animals = await Animal.find({ farmId: req.params.farmId });
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching animals", error: error.message });
  }
});

// Generate a unique Animal ID
router.get("/generate-id", authMiddleware, async (req, res) => {
  try {
    const { farmId, category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "Missing category" });
    }

    let prefix = "AHMED-C";
    if (category.toLowerCase().includes("beef")) prefix = "AHMED-B";
    else if (category.toLowerCase().includes("sheep")) prefix = "AHMED-S";
    else if (category.toLowerCase().includes("goat")) prefix = "AHMED-G";
    else if (category.toLowerCase().includes("poultry")) prefix = "AHMED-P";
    else if (category.toLowerCase().includes("rabbit")) prefix = "AHMED-R";
    else if (category.toLowerCase().includes("pig")) prefix = "AHMED-PG";

    const query = farmId ? { farmId } : {};
    const existingAnimals = await Animal.find(query);

    const ids = existingAnimals
      .map((a) => a.animalId)
      .filter((id) => id.startsWith(prefix))
      .map((id) => parseInt(id.replace(prefix, "")))
      .filter((num) => !isNaN(num));

    const nextNumber = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    const formattedNum = String(nextNumber).padStart(3, "0");
    const newId = `${prefix}${formattedNum}`;

    return res.status(200).json({ animalId: newId });
  } catch (error) {
    console.error("Error generating ID", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

