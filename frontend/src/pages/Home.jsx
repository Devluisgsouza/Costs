import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { BsBoxes, BsPlusLg, BsGraphUpArrow } from 'react-icons/bs'
import Button from '../components/ui/Button'
import { useUserSession } from '../context/SessionContext'

function Home() {
  const { user } = useUserSession()

  return (
    <section className={styles.home}>
      <span className={styles.badge}>
        <BsGraphUpArrow /> Gestão de custos simplificada
      </span>

      <h1 className={styles.title}>
        Olá, {user.username} 👋
        <br />
        Bem-vindo ao <span>Costs</span>
      </h1>

      <p className={styles.subtitle}>
        Gerencie qualquer tipo de projeto agora mesmo. Controle orçamentos, acompanhe
        serviços e mantenha seus custos sob controle.
      </p>

      <div className={styles.actions}>
        <Link to="/newproject">
          <Button size="lg">
            <BsPlusLg /> Criar Projeto
          </Button>
        </Link>
        <Link to="/projects">
          <Button size="lg" variant="secondary">
            <BsBoxes /> Meus Projetos
          </Button>
        </Link>
      </div>

      <p className={styles.quote}>
        O bom gerenciamento de um projeto é a chave para o seu sucesso!
      </p>
    </section>
  )
}

export default Home
