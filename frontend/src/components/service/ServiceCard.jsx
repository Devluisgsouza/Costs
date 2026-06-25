import styles from './ServiceCard.module.css'
import { BsEyeFill, BsFillTrashFill } from 'react-icons/bs'
import Card from '../ui/Card'
import CurrencyDisplay from '../ui/CurrencyDisplay'

function ServiceCard({ id, name, cost, description, handleRemove, handleView }) {
  const view = (e) => {
    e.preventDefault()
    handleView({ id, name, cost, description })
  }

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id, cost)
  }

  return (
    <Card hover className={styles.card}>
      <div className={styles.top}>
        <h4 className={styles.name}>{name}</h4>
        <CurrencyDisplay value={cost} size="sm" />
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.actions}>
        <button className={styles.view} onClick={view}>
          <BsEyeFill /> Visualizar
        </button>
        <button className={styles.remove} onClick={remove} title="Excluir serviço">
          <BsFillTrashFill />
        </button>
      </div>
    </Card>
  )
}

export default ServiceCard
