import styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'



function ProjectCard({id, name, budget, category, handleRemove}) {


    const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
  }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: <span>R${formatCurrency(budget)}</span></span> 
            </p>
            <div className={styles.category_text}>
                <p>
                    <span className={`${styles[category.toLowerCase()]}`}></span> {category}
                </p>
            </div>
            <div className={styles.project_card_actions}>
                <Link to="/">
                    <BsPencil /> Editar
                </Link>
                <button>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>

    )
}



export default ProjectCard