import styles from './Card.module.css'

function Card({ children, accentColor, hover = false, className = '', style, ...rest }) {
  const classes = [styles.card, hover ? styles.hover : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} style={style} {...rest}>
      {accentColor && (
        <span className={styles.accentLine} style={{ background: accentColor }} />
      )}
      {children}
    </div>
  )
}

export default Card
