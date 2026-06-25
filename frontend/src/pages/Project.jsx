import styles from './Project.module.css'
import { useParams, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BsChevronRight, BsPencilFill, BsPlusLg, BsXLg } from 'react-icons/bs'

import Loading from '../components/layout/Loading'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import CurrencyDisplay from '../components/ui/CurrencyDisplay'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import ProjectForm from '../components/project/ProjectForm'
import ServiceForm from '../components/service/ServiceForm'
import ServiceCard from '../components/service/ServiceCard'
import ServiceModal from '../components/service/ServiceModal'

import { useUserSession } from '../context/SessionContext'
import { useToast } from '../context/ToastContext'
import { getProject, updateProject } from '../lib/db'

function Project() {
  const { id } = useParams()
  const location = useLocation()
  const { user } = useUserSession()
  const { notify } = useToast()

  const [project, setProject] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [errors, setErrors] = useState({})
  const [selectedService, setSelectedService] = useState(null)
  const [serviceToRemove, setServiceToRemove] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getProject(user.id, id)
      if (data) {
        setProject({
          ...data,
          cost: data.cost || 0,
          services: data.services || [],
        })
      }
      setLoaded(true)
      if (location.state?.edit) setShowProjectForm(true)
    }, 300)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user.id])

  function toggleProjectForm() {
    setShowProjectForm((v) => !v)
  }

  function toggleServiceForm() {
    setShowServiceForm((v) => !v)
    setErrors({})
  }

  function viewService(service) {
    setSelectedService(service)
  }

  function persist(updatedProject) {
    updateProject(user.id, updatedProject.id, updatedProject)
    setProject(updatedProject)
  }

  function createService(service) {
    let newErrors = {}

    if (!service.name || service.name.trim() === '') {
      newErrors.name = 'O nome do serviço é obrigatório'
    }
    if (!service.cost || service.cost <= 0) {
      newErrors.cost = 'O custo deve ser maior que zero'
    }
    if (!service.description || service.description.trim() === '') {
      newErrors.description = 'A descrição do serviço é obrigatória'
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})

    const updatedProject = { ...project }
    updatedProject.services = updatedProject.services || []

    service.id = uuidv4()

    const projectCost = Number(updatedProject.cost || 0)
    const serviceCost = Number(service.cost || 0)
    const newCost = projectCost + serviceCost

    if (newCost > Number(updatedProject.budget)) {
      setErrors({
        budget: 'Orçamento ultrapassado, verifique o valor do serviço!',
      })
      return
    }

    updatedProject.services = [...updatedProject.services, service]
    updatedProject.cost = newCost

    persist(updatedProject)
    setShowServiceForm(false)
    notify('Serviço adicionado com sucesso!', 'success')
  }

  function removeService(serviceId, cost) {
    const serviceCost = Number(cost)
    const currentCost = Number(project.cost)

    const servicesUpdated = project.services.filter((s) => s.id !== serviceId)

    const projectUpdated = {
      ...project,
      services: servicesUpdated,
      cost: currentCost - serviceCost,
    }

    persist(projectUpdated)
    notify('Serviço removido com sucesso!', 'success')
  }

  function editPost(updated) {
    if (Number(updated.budget) < Number(updated.cost)) {
      notify('O orçamento não pode ser menor que o custo do projeto!', 'error')
      return false
    }

    const merged = { ...project, ...updated, budget: Number(updated.budget) }
    persist(merged)
    setShowProjectForm(false)
    notify('Projeto editado com sucesso!', 'success')
  }

  if (!loaded) return <Loading />

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Projeto não encontrado</h1>
        <Link to="/projects">
          <Button variant="secondary">Voltar para projetos</Button>
        </Link>
      </div>
    )
  }

  const budget = Number(project.budget) || 0
  const cost = Number(project.cost) || 0
  const available = budget - cost
  const exceeded = cost > budget

  return (
    <section className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/projects">Projetos</Link>
        <BsChevronRight />
        <span>{project.name}</span>
      </nav>

      <Card className={styles.headerCard} accentColor="var(--accent-primary)">
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.projectName}>{project.name}</h1>
            <div className={styles.headerMeta}>
              <Badge label={project.category?.name} />
            </div>
          </div>
          <Button
            variant={showProjectForm ? 'ghost' : 'secondary'}
            onClick={toggleProjectForm}
          >
            {showProjectForm ? (
              <>
                <BsXLg /> Fechar
              </>
            ) : (
              <>
                <BsPencilFill /> Editar Projeto
              </>
            )}
          </Button>
        </div>

        {showProjectForm ? (
          <div className={styles.editForm}>
            <ProjectForm
              handleSubmit={editPost}
              btnText="Concluir edição"
              projectData={project}
            />
          </div>
        ) : (
          <>
            <div className={styles.progress}>
              <ProgressBar value={cost} max={budget} showPercent />
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Orçamento</span>
                <CurrencyDisplay value={budget} size="lg" animate />
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Total Utilizado</span>
                <CurrencyDisplay value={cost} size="lg" exceeded={exceeded} animate />
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Disponível</span>
                <CurrencyDisplay
                  value={available}
                  size="lg"
                  exceeded={available < 0}
                  positive={available >= 0}
                  animate
                />
              </div>
            </div>
          </>
        )}
      </Card>

      <div className={styles.servicesHead}>
        <h2 className={styles.servicesTitle}>Serviços do Projeto</h2>
        <Button
          variant={showServiceForm ? 'ghost' : 'primary'}
          onClick={toggleServiceForm}
        >
          {showServiceForm ? (
            <>
              <BsXLg /> Fechar
            </>
          ) : (
            <>
              <BsPlusLg /> Adicionar Serviço
            </>
          )}
        </Button>
      </div>

      {showServiceForm && (
        <Card className={styles.serviceFormCard}>
          <ServiceForm
            handleSubmit={createService}
            btnText="Adicionar Serviço"
            errors={errors}
          />
        </Card>
      )}

      <div className={styles.servicesGrid}>
        {project.services?.length > 0 ? (
          project.services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              cost={service.cost}
              description={service.description}
              handleRemove={(sid, scost) => setServiceToRemove({ id: sid, cost: scost })}
              handleView={viewService}
            />
          ))
        ) : (
          <p className={styles.noServices}>Não há serviços cadastrados!</p>
        )}
      </div>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}

      <ConfirmDialog
        open={!!serviceToRemove}
        title="Excluir serviço"
        message="Tem certeza que deseja excluir este serviço? O valor será descontado do total utilizado."
        onConfirm={() => {
          removeService(serviceToRemove.id, serviceToRemove.cost)
          setServiceToRemove(null)
        }}
        onCancel={() => setServiceToRemove(null)}
      />
    </section>
  )
}

export default Project
