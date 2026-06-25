import { useEffect, useState } from 'react'
import styles from './ProgressBar.module.css'

function ProgressBar({ value = 0, max = 0, showPercent = false }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const ratio = max > 0 ? value / max : 0
  const percent = Math.min(Math.max(ratio, 0), 1) * 100
  const percentLabel = Math.round(ratio * 100)

  let level = 'safe'
  if (ratio >= 0.9) level = 'danger'
  else if (ratio >= 0.7) level = 'warning'

  if (!showPercent) {
    return (
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[level]}`}
          style={{ width: mounted ? `${percent}%` : '0%' }}
        />
      </div>
    )
  }

  return (
    <div className={styles.row}>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[level]}`}
          style={{ width: mounted ? `${percent}%` : '0%' }}
        />
      </div>
      <span className={`${styles.percent} ${styles[level]}`}>{percentLabel}%</span>
    </div>
  )
}

export default ProgressBar
