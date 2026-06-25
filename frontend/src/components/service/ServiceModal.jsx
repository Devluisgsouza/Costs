import styles from './ServiceModal.module.css'
import { BsXLg } from 'react-icons/bs'
import CurrencyDisplay from '../ui/CurrencyDisplay'

function ServiceModal({ service, onClose }) {
  if (!service) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_btn} onClick={onClose} aria-label="Fechar">
          <BsXLg />
        </button>

        <h2 className={styles.title}>{service.name}</h2>

        <div className={styles.cost}>
          <span className={styles.label}>Custo</span>
          <CurrencyDisplay value={service.cost} size="lg" />
        </div>

        <span className={styles.label}>Descrição</span>
        <p className={styles.description}>{service.description}</p>
      </div>
    </div>
  )
}

export default ServiceModal
