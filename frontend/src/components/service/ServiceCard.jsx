import styles from '../project/ProjectCard.module.css'
import { BsEyeFill, BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({ id, name, cost, description, handleRemove, handleView }) {

    const remove = (e) => {
        e.preventDefault()
        const confirm = window.confirm(`Tem certeza que deseja excluir o serviço?`)
        if (confirm) {
            handleRemove(id, cost)
        }
    }

    const view = (e) => {
        e.preventDefault()
        handleView({ id, name, cost, description })
    }

    const formatCurrency = (value) => {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p><span>Custo: <span>{formatCurrency(cost)}</span></span></p>
            <p><span>Descrição: </span>{description}</p>

            <div className={styles.project_card_actions}>
                <button onClick={view}>
                    <BsEyeFill />
                    <span>Visualizar</span>
                </button>

                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard
