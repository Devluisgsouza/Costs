import styles from './ProjectCard.module.css'
import { BsEyeFill, BsPencilFill, BsFillTrashFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import CurrencyDisplay from '../ui/CurrencyDisplay'
import { colorFromString } from '../../lib/format'

function ProjectCard({ id, name, budget, category, cost = 0, onRequestRemove }) {
  const navigate = useNavigate()
  const categoryColor = colorFromString(category || '')
  const spent = Number(cost) || 0
  const total = Number(budget) || 0
  const exceeded = spent > total

  return (
    <Card hover accentColor={categoryColor.solid} className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.name}>{name}</h4>
        <Badge label={category} color={categoryColor} />
      </div>

      <div className={styles.progressRow}>
        <ProgressBar value={spent} max={total} showPercent />
      </div>

      <div className={styles.figures}>
        <div>
          <span className={styles.label}>Gasto</span>
          <CurrencyDisplay value={spent} size="sm" exceeded={exceeded} />
        </div>
        <div className={styles.right}>
          <span className={styles.label}>Orçamento</span>
          <CurrencyDisplay value={total} size="sm" />
        </div>
      </div>

      <div className={styles.actions}>
        <Link to={`/project/${id}`} className={styles.view}>
          <BsEyeFill /> Detalhes
        </Link>
        <button
          className={styles.edit}
          onClick={() => navigate(`/project/${id}`, { state: { edit: true } })}
          title="Editar projeto"
        >
          <BsPencilFill />
        </button>
        <button
          className={styles.remove}
          onClick={() => onRequestRemove?.(id, name)}
          title="Excluir projeto"
        >
          <BsFillTrashFill />
        </button>
      </div>
    </Card>
  )
}

export default ProjectCard
