<h1 align="center">
  <img src="frontend/public/favicon.svg" width="110" alt="Costs">
  <br><br>
  COSTS
</h1>

<p align="center">
  <strong>Gerencie os custos dos seus projetos com eficiência e clareza.</strong>
</p>

<p align="center">
  <a href="https://costsprojects.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Acessar%20o%20Site-costsprojects.netlify.app-6366F1?style=for-the-badge" alt="Site">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-ativo-success?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/persistência-localStorage-F59E0B?style=flat-square" />
</p>

---

## 📖 Sobre o Projeto

**COSTS** é uma aplicação para gerenciamento de custos de projetos. Crie projetos com um
orçamento, adicione serviços com seus respectivos custos e acompanhe em tempo real quanto
já foi gasto e quanto ainda está disponível.

A aplicação é uma **SPA React** que roda inteiramente no navegador: cada usuário tem seus
próprios dados isolados, salvos no **localStorage** — sem necessidade de servidor ou banco
de dados para usar.

### ✨ Funcionalidades

- 🔐 **Login por usuário** (usuário + senha) — cada pessoa vê apenas os seus projetos.
- 🗂️ **Projetos** — criar, editar e excluir, com orçamento e categoria.
- 🧾 **Serviços** — adicionar, visualizar e remover serviços de cada projeto.
- 📊 **Controle de orçamento** — barra de progresso com porcentagem e bloqueio quando o
  custo ultrapassaria o orçamento.
- 💾 **Persistência local** — os dados ficam salvos por usuário; o logout preserva os dados.
- 🎨 **Interface dark** — design responsivo com componentes próprios e notificações (toasts).

> 🎯 **Motivação:** projeto desenvolvido para aprofundar conhecimentos em React, gerenciamento
> de estado e construção de interfaces.

---

## 🚀 Deploy

| Serviço  | Plataforma | Link                                                          |
| -------- | ---------- | ------------------------------------------------------------- |
| Frontend | Netlify    | [costsprojects.netlify.app](https://costsprojects.netlify.app/) |

---

## 🛠️ Tecnologias

- [React](https://react.dev/) — biblioteca para construção de interfaces
- [React Router DOM](https://reactrouter.com/) — gerenciamento de rotas
- [CSS Modules](https://github.com/css-modules/css-modules) — estilização por componente
- [React Icons](https://react-icons.github.io/react-icons/) — ícones
- [uuid](https://github.com/uuidjs/uuid) — geração de identificadores
- **localStorage** — persistência dos dados por usuário (sem backend)

> 💡 O diretório `backend/` contém uma API **legada** (Node.js + Express + MongoDB) usada em
> versões anteriores. Após a migração da persistência para o `localStorage`, ela **não é mais
> necessária** para executar o app — ficou no repositório apenas como referência.

---

## ☑️ Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/en/download) instalado na máquina

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Devluisgsouza/Costs.git
   ```

2. **Entre na pasta do frontend**
   ```bash
   cd Costs/frontend
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Inicie a aplicação**
   ```bash
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000`. Basta informar um usuário e senha
na tela inicial — a conta é criada automaticamente no primeiro acesso.

---

## 📁 Estrutura do Projeto

```
Costs/
├── frontend/                 # Aplicação React (SPA)
│   ├── public/               # index.html, favicon.svg, _redirects
│   └── src/
│       ├── components/
│       │   ├── form/         # Input, Select
│       │   ├── layout/       # Navbar, Footer, Container, UserBadge...
│       │   ├── project/      # ProjectCard, ProjectForm
│       │   ├── service/      # ServiceCard, ServiceForm, ServiceModal
│       │   └── ui/           # Button, Card, Badge, ProgressBar, Toast...
│       ├── context/          # SessionContext, ToastContext
│       ├── lib/              # db (localStorage) e formatação
│       └── pages/            # LoginScreen, Home, Projects, Project...
├── backend/                  # API legada (Node.js + MongoDB) — opcional
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
