import { createContext, useContext, useState, useCallback } from 'react'
import { loginOrRegister } from '../lib/db'

const SESSION_KEY = 'costs_session'

const SessionContext = createContext(null)

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function SessionProvider({ children }) {
  const [user, setUser] = useState(() => readSession())

  /**
   * Autentica/registra por username + senha.
   * Retorna { ok, error? } — não lança em caso de senha incorreta.
   */
  const login = useCallback((username, password) => {
    const result = loginOrRegister(username, password)
    if (!result.ok) return result

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(result.user))
    setUser(result.user)
    return result
  }, [])

  const logout = useCallback(() => {
    // Limpa apenas a sessão — os dados em localStorage são preservados.
    sessionStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  return (
    <SessionContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useUserSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error('useUserSession deve ser usado dentro de <SessionProvider>')
  }
  return ctx
}
