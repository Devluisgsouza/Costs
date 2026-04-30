require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const categories = [
  { name: 'Infraestrutura' },
  { name: 'Desenvolvimento' },
  { name: 'Design' },
  { name: 'Planejamento' },
  { name: 'Outros' },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const existing = await Category.countDocuments();
    if (existing > 0) {
      console.log('⚠️  Categorias já existem no banco. Seed ignorado.');
      process.exit(0);
    }
    await Category.insertMany(categories);
    console.log('✅ Categorias inseridas com sucesso!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erro:', err);
    process.exit(1);
  });