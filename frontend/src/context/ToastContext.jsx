import { createContext, useContext, useState, useCallback, useRef } from 'react'
import styles from './ToastContext.module.css'
import { BsCheckCircleFill, BsExclamationTriangleFill, BsInfoCircleFill, BsXLg } from 'react-icons/bs'

const ToastContext = createContext(null)

const ICONS = {
  success: <BsCheckCircleFill />,
  error: <BsExclamationTriangleFill />,
  info: <BsInfoCircleFill />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (message, type = 'success', duration = 3200) => {
      const id = ++idRef.current
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => dismiss(id), duration)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className={styles.container} aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
            <span className={styles.icon}>{ICONS[t.type] || ICONS.info}</span>
            <span className={styles.message}>{t.message}</span>
            <button className={styles.close} onClick={() => dismiss(t.id)} aria-label="Fechar">
              <BsXLg />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>')
  }
  return ctx
}
