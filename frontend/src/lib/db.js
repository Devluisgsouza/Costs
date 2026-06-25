import { v4 as uuidv4 } from 'uuid'

/**
 * Camada de persistência baseada em localStorage.
 *
 * Estrutura no localStorage:
 *   costs_db_version -> versão do schema (usada para resetar dados antigos)
 *   costs_users -> { [userId]: { username, password, createdAt } }
 *   costs_projects_<userId> -> [ { id, name, budget, cost, category, services, createdAt } ]
 *
 * userId = username em minúsculas.
 *
 * A lógica de negócio (cálculo de custo/orçamento, validações) permanece nas
 * páginas/componentes. Esta camada apenas lê/grava os dados.
 */

const DB_VERSION = '2'
const VERSION_KEY = 'costs_db_version'
const USERS_KEY = 'costs_users'
const SESSION_KEY = 'costs_session'
const projectsKey = (userId) => `costs_projects_${userId}`

/* Categorias fixas (antes vinham do backend via seed). */
export const CATEGORIES = [
  { id: 'infraestrutura', name: 'Infraestrutura' },
  { id: 'desenvolvimento', name: 'Desenvolvimento' },
  { id: 'design', name: 'Design' },
  { id: 'planejamento', name: 'Planejamento' },
  { id: 'outros', name: 'Outros' },
]

export function getCategories() {
  return CATEGORIES
}

/* ---------- reset / migração ---------- */

/**
 * Se o schema mudou (ou existem dados em formato antigo), reseta o banco:
 * remove todas as chaves "costs_*" e a sessão ativa, e grava a nova versão.
 */
function ensureVersion() {
  const current = localStorage.getItem(VERSION_KEY)
  if (current === DB_VERSION) return

  Object.keys(localStorage)
    .filter((k) => k.startsWith('costs_'))
    .forEach((k) => localStorage.removeItem(k))

  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignora ambientes sem sessionStorage */
  }

  localStorage.setItem(VERSION_KEY, DB_VERSION)
}

ensureVersion()

/* ---------- helpers ---------- */

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function makeUserId(username) {
  return username.trim().toLowerCase()
}

/**
 * Hash simples e determinístico para não guardar a senha em texto puro.
 * OBS: NÃO é criptografia segura — apenas ofusca o valor no localStorage.
 */
function hashPassword(password) {
  let hash = 0
  const str = `costs::${password}`
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return `h${(hash >>> 0).toString(16)}`
}

/* ---------- usuários ---------- */

export function getUsers() {
  return readJSON(USERS_KEY, {})
}

export function getUser(userId) {
  return getUsers()[userId] || null
}

/**
 * Autentica ou registra um usuário por username + senha.
 *
 * - Se o username já existe: valida a senha. Senha errada => { ok: false }.
 * - Se não existe: cria o usuário com a senha informada e projetos vazios.
 *
 * Retorna { ok, user?, error? }.
 */
export function loginOrRegister(username, password) {
  const uname = username.trim()
  const userId = makeUserId(uname)
  const users = getUsers()

  if (users[userId]) {
    if (users[userId].password !== hashPassword(password)) {
      return { ok: false, error: 'Senha incorreta para este usuário.' }
    }
    return { ok: true, user: { id: userId, username: users[userId].username } }
  }

  users[userId] = {
    username: uname,
    password: hashPassword(password),
    createdAt: new Date().toISOString(),
  }
  writeJSON(USERS_KEY, users)

  if (!localStorage.getItem(projectsKey(userId))) {
    writeJSON(projectsKey(userId), [])
  }

  return { ok: true, user: { id: userId, username: uname } }
}

/* ---------- projetos (por usuário) ---------- */

export function getProjects(userId) {
  return readJSON(projectsKey(userId), [])
}

export function getProject(userId, id) {
  return getProjects(userId).find((p) => p.id === id) || null
}

export function createProject(userId, project) {
  const projects = getProjects(userId)
  const newProject = {
    ...project,
    id: uuidv4(),
    cost: Number(project.cost) || 0,
    services: project.services || [],
    createdAt: new Date().toISOString(),
  }
  projects.push(newProject)
  writeJSON(projectsKey(userId), projects)
  return newProject
}

export function updateProject(userId, id, updated) {
  const projects = getProjects(userId)
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return null

  const merged = { ...projects[index], ...updated, id }
  projects[index] = merged
  writeJSON(projectsKey(userId), projects)
  return merged
}

export function deleteProject(userId, id) {
  const projects = getProjects(userId).filter((p) => p.id !== id)
  writeJSON(projectsKey(userId), projects)
  return true
}
