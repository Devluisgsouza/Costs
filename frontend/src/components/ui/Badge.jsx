import styles from './Badge.module.css'
import { colorFromString } from '../../lib/format'

function Badge({ label, color }) {
  const c = color || colorFromString(label || '')

  return (
    <span
      className={styles.badge}
      style={{
        color: c.text,
        background: c.bg,
        borderColor: c.border,
      }}
    >
      <span className={styles.dot} style={{ background: c.solid }} />
      {label}
    </span>
  )
}

export default Badge
