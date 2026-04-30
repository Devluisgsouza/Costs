const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    // Formata para manter compatibilidade com o frontend (usa .id e .name)
    const formatted = categories.map(c => ({ id: c._id, name: c.name }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;