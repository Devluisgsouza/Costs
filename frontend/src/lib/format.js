/* Formatação monetária pt-BR: R$ 1.234,56 */
export function formatCurrency(value) {
  const num = Number(value)
  if (value === null || value === undefined || Number.isNaN(num)) {
    return 'R$ 0,00'
  }
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

/**
 * Gera um par de cores (hsl) determinístico a partir de uma string.
 * Usado para colorir badges de categoria automaticamente.
 */
export function colorFromString(str = '') {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash |= 0
  }
  const hue = Math.abs(hash) % 360
  return {
    hue,
    text: `hsl(${hue}, 70%, 72%)`,
    bg: `hsla(${hue}, 70%, 55%, 0.15)`,
    border: `hsla(${hue}, 70%, 60%, 0.35)`,
    solid: `hsl(${hue}, 65%, 60%)`,
  }
}

/**
 * Iniciais a partir de um username. Considera separadores comuns
 * (".", "_", "-", espaço) para montar até 2 letras; senão usa as 2 primeiras.
 */
export function getInitials(username = '') {
  const parts = username.trim().split(/[\s._-]+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return username.trim().slice(0, 2).toUpperCase()
}
