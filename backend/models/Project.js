const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  description: { type: String },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  cost: { type: Number, default: 0 },
  category: {
    id: { type: String },
    name: { type: String },
  },
  services: { type: [serviceSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);