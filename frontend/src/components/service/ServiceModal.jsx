import styles from './ServiceModal.module.css'

function ServiceModal({ service, onClose }) {

    if (!service) return null

    const formatCurrency = (value) => {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.close_btn} onClick={onClose}>
                    <p>X</p>
                </button>

                <h2>{service.name}</h2>

                <p><strong>Custo: </strong> {formatCurrency(service.cost)}</p>

                <p><strong>Descrição:</strong></p>
                <p className={styles.description}>{service.description}</p>
            </div>
        </div>
    )
}

export default ServiceModal
