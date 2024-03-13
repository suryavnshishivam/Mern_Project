const express = require("express");
const recordRoutes = express.Router();
const mongoose = require("mongoose");

// Define the record schema
const recordSchema = new mongoose.Schema({
  name: String,
  position: String,
  level: String
});

// Define the Record model
const Record = mongoose.model("Record", recordSchema, "record");

// Retrieve all records
recordRoutes.route("/records").get(async (req, res) => {
  try {
    const records = await Record.find({});
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve a single record by ID
recordRoutes.route("/records/:id").get(async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new record
recordRoutes.route("/records").post(async (req, res) => {
  try {
    const { name, position, level } = req.body;
    if (!name || !position || !level) {
      return res.status(400).json({ error: "Name, position, and level are required" });
    }
    const newRecord = new Record({ name, position, level });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a record by ID
recordRoutes.route("/records/:id").put(async (req, res) => {
  try {
    const { name, position, level } = req.body;
    if (!name || !position || !level) {
      return res.status(400).json({ error: "Name, position, and level are required" });
    }
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id, { name, position, level }, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a record by ID
recordRoutes.route("/records/:id").delete(async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = recordRoutes;
