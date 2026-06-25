import styles from './Projects.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsPlusLg, BsFolderPlus } from 'react-icons/bs'

import ProjectCard from '../components/project/ProjectCard'
import Loading from '../components/layout/Loading'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import { useUserSession } from '../context/SessionContext'
import { useToast } from '../context/ToastContext'
import { getProjects, deleteProject } from '../lib/db'

function Projects() {
  const { user } = useUserSession()
  const { notify } = useToast()

  const [projects, setProjects] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [toRemove, setToRemove] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(getProjects(user.id))
      setLoaded(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [user.id])

  function confirmRemove() {
    if (!toRemove) return
    deleteProject(user.id, toRemove.id)
    setProjects((prev) => prev.filter((p) => p.id !== toRemove.id))
    notify('Projeto removido com sucesso!', 'success')
    setToRemove(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Meus Projetos</h1>
          <p className={styles.subtitle}>
            {projects.length > 0
              ? `${projects.length} projeto${projects.length > 1 ? 's' : ''} cadastrado${
                  projects.length > 1 ? 's' : ''
                }`
              : 'Crie e acompanhe os custos dos seus projetos'}
          </p>
        </div>
        <Link to="/newproject">
          <Button>
            <BsPlusLg /> Novo Projeto
          </Button>
        </Link>
      </div>

      {!loaded && <Loading />}

      {loaded && projects.length === 0 && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <BsFolderPlus />
          </span>
          <h2>Nenhum projeto ainda</h2>
          <p>Comece criando seu primeiro projeto para controlar seus custos.</p>
          <Link to="/newproject">
            <Button size="lg">
              <BsPlusLg /> Criar primeiro projeto
            </Button>
          </Link>
        </div>
      )}

      {loaded && projects.length > 0 && (
        <section className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category?.name}
              cost={project.cost}
              onRequestRemove={(id, name) => setToRemove({ id, name })}
            />
          ))}
        </section>
      )}

      <ConfirmDialog
        open={!!toRemove}
        title="Excluir projeto"
        message={`Tem certeza que deseja excluir o projeto "${toRemove?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={confirmRemove}
        onCancel={() => setToRemove(null)}
      />
    </div>
  )
}

export default Projects
