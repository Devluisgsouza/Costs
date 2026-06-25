import styles from './ConfirmDialog.module.css'
import Button from './Button'
import { BsExclamationTriangleFill } from 'react-icons/bs'

function ConfirmDialog({
  open,
  title = 'Confirmar ação',
  message,
  confirmText = 'Excluir',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <span className={styles.icon}>
          <BsExclamationTriangleFill />
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
