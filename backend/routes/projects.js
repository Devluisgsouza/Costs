const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /projects — lista todos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    const formatted = projects.map(formatProject);
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /projects/:id — busca por id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(formatProject(project));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /projects — cria novo
router.post('/', async (req, res) => {
  try {
    const { name, budget, category, cost, services } = req.body;
    const project = new Project({
      name,
      budget,
      category,
      cost: cost || 0,
      services: services || [],
    });
    const saved = await project.save();
    res.status(201).json(formatProject(saved));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /projects/:id — atualiza (edição de projeto ou adição/remoção de serviço)
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });

    const { name, budget, category, cost, services } = req.body;

    if (name !== undefined) project.name = name;
    if (budget !== undefined) project.budget = budget;
    if (category !== undefined) project.category = category;
    if (cost !== undefined) project.cost = cost;
    if (services !== undefined) project.services = services;

    const updated = await project.save();
    res.json(formatProject(updated));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /projects/:id — remove projeto
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json({ message: 'Projeto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Formata o projeto para manter compatibilidade total com o frontend
// O frontend usa .id (não ._id) em todos os lugares
function formatProject(project) {
  const obj = project.toObject();
  obj.id = obj._id.toString();

  if (obj.services) {
    obj.services = obj.services.map(s => ({
      ...s,
      id: s.id || s._id?.toString(),
    }));
  }

  return obj;
}

module.exports = router;