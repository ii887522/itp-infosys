const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const YourModel = require('../models/YourModel'); // Define your Mongoose model

// GET request to fetch a record by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const record = await YourModel.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    return res.json(record);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
