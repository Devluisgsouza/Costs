require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const projectsRouter = require('./routes/projects');
const categoriesRouter = require('./routes/categories');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectsRouter);
app.use('/categories', categoriesRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB conectado!');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });