import { useEffect, useRef, useState } from 'react'
import styles from './CurrencyDisplay.module.css'
import { formatCurrency } from '../../lib/format'

/**
 * Exibe um valor monetário em pt-BR (R$ 1.234,56) com fonte mono.
 * - exceeded: pinta de vermelho (orçamento estourado)
 * - positive: pinta de verde
 * - animate: anima a contagem do valor ao montar/alterar
 */
function CurrencyDisplay({
  value = 0,
  exceeded = false,
  positive = false,
  animate = false,
  size = 'md',
  className = '',
}) {
  const [display, setDisplay] = useState(animate ? 0 : Number(value) || 0)
  const fromRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const target = Number(value) || 0

    if (!animate) {
      setDisplay(target)
      return
    }

    const from = fromRef.current
    const duration = 600
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (target - from) * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, animate])

  const tone = exceeded ? styles.danger : positive ? styles.success : ''

  return (
    <span className={`${styles.value} ${styles[size]} ${tone} ${className}`}>
      {formatCurrency(display)}
    </span>
  )
}

export default CurrencyDisplay
