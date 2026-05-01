<h1 align="center">
  <img src='https://github.com/Devluisgsouza/Costs/blob/main/frontend/src/img/costs_logo.png' width="200">
  <br><br>
  COSTS
</h1>

<p align="center">
  <strong>Gerencie seus projetos com eficiência e clareza.</strong>
</p>

<p align="center">
  <a href="https://costsprojects.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Acessar%20o%20Site-costsprojects.netlify.app-blue?style=for-the-badge" alt="Site">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/fullstack-React%20%2B%20Node.js%20%2B%20MongoDB-informational?style=flat-square" />
</p>

---

## 📖 Sobre o Projeto

**COSTS** é uma aplicação fullstack para gerenciamento de gastos em projetos. Com ela, você pode criar projetos, adicionar serviços e acompanhar o orçamento em tempo real — tudo em uma interface simples e intuitiva.

- Crie projetos e defina um orçamento máximo.
- Adicione serviços com seus respectivos custos.
- Acompanhe o saldo disponível e os gastos de cada projeto.

> 🎯 **Motivação:** Projeto desenvolvido para aprofundar os conhecimentos em React, Node.js, MongoDB e deploy em nuvem.

---

## 🚀 Deploy

| Serviço | Plataforma | Link |
|--------|-----------|------|
| Frontend | Netlify | [costsprojects.netlify.app](https://costsprojects.netlify.app/) |
| Backend | Render | API em produção via Render |

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- [React](https://react.dev/) — Biblioteca para construção de interfaces
- [React Router DOM](https://reactrouter.com/) — Gerenciamento de rotas
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Linguagem principal

### Backend
- [Node.js](https://nodejs.org/pt) — Ambiente de execução server-side
- [Express](https://expressjs.com/) — Framework para criação da API REST
- [MongoDB](https://www.mongodb.com/) — Banco de dados NoSQL em nuvem

### Infraestrutura
- [Netlify](https://www.netlify.com/) — Deploy e hospedagem do frontend
- [Render](https://render.com/) — Deploy e hospedagem do backend

---

## ☑️ Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/en/download) instalado na máquina
- Instância do MongoDB configurada (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/Devluisgsouza/Costs.git
```

2. **Entre no diretório do projeto**
```bash
cd Costs
```

3. **Instale as dependências do frontend**
```bash
cd frontend
npm install
```

4. **Instale as dependências do backend**
```bash
cd ../backend
npm install
```

5. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:
```env
MONGO_URI=sua_string_de_conexao_mongodb
PORT=5000
```

6. **Inicie o backend**
```bash
npm start
```

7. **Inicie o frontend** (em outro terminal)
```bash
cd ../frontend
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 👁️ Preview

<div align="center">

### 🏠 Home Page
<img src='https://github.com/Devluisgsouza/Costs/blob/main/frontend/src/img/home_costs.png' width="800">

---

### 📋 Página de Projetos
<img src='https://github.com/Devluisgsouza/Costs/blob/main/frontend/src/img/projects_costs.png' width="800">

---

### 🏢 Página da Empresa
<img src='https://github.com/Devluisgsouza/Costs/blob/main/frontend/src/img/company_costs.png' width="800">

---

### 🔍 Detalhes do Projeto
<img src='https://github.com/Devluisgsouza/Costs/blob/main/frontend/src/img/Project_details.png' width="800">

---

### ➕ Criar Projeto
<img src='https://github.com/Devluisgsouza/Costs/blob/main/frontend/src/img/NewProject.png' width="800">

---

### 🔧 Criar Serviços
<img src='https://github.com/Devluisgsouza/Costs/blob/main/frontend/src/img/NewServiccess.png' width="800">

</div>

---

## 📁 Estrutura do Projeto

```
Costs/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── img/
│   └── package.json
├── backend/           # API Node.js + MongoDB
│   ├── models/
│   ├── routes/
│   └── package.json
└── README.md
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: adiciona minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido por <a href="https://github.com/Devluisgsouza">Luis Souza</a> 🚀
</p>

