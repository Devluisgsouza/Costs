import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'
import ProjectForm from '../components/project/ProjectForm'
import Card from '../components/ui/Card'
import { useUserSession } from '../context/SessionContext'
import { useToast } from '../context/ToastContext'
import { createProject } from '../lib/db'

function NewProject() {
  const navigate = useNavigate()
  const { user } = useUserSession()
  const { notify } = useToast()

  function createPost(project) {
    const created = createProject(user.id, {
      ...project,
      budget: Number(project.budget),
      cost: 0,
      services: [],
    })
    notify('Projeto criado com sucesso!', 'success')
    navigate(`/project/${created.id}`)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Criar Projeto</h1>
      <p className={styles.subtitle}>Crie o seu projeto para depois adicionar os serviços.</p>

      <Card className={styles.formCard}>
        <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
      </Card>
    </div>
  )
}

export default NewProject
