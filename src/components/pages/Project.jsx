import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import ServiceModal from '../service/ServiceModal'

function Project() {
    
    const { id } = useParams()

    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [errors, setErrors] = useState({})
    const [selectedService, setSelectedService] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject({
                    ...data,
                    cost: data.cost || 0,
                    services: data.services || []
                })
            })
            .catch((err) => console.log(err))
        }, 500)
    }, [id])

    function toggleProjecForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
        setErrors({})
    }

    function viewService(service) {
        setSelectedService(service)
    }

    function closeServiceModal() {
        setSelectedService(null)
    }

    function createService(service) {

        setMessage('')
        
        let newErrors = {}

        if (!service.name || service.name.trim() === "") {
            newErrors.name = "O nome do serviço é obrigatório"
        }

        if (!service.cost || service.cost <= 0) {
            newErrors.cost = "O custo deve ser maior que zero"
        }

        if (!service.description || service.description.trim() === "") {
            newErrors.description = "A descrição do serviço é obrigatória"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})

        const updatedProject = { ...project }
        updatedProject.services = updatedProject.services || []

        service.id = uuidv4()
        updatedProject.services = [...updatedProject.services, service]

        const projectCost = Number(updatedProject.cost || 0)
        const serviceCost = Number(service.cost || 0)
        const newCost = projectCost + serviceCost

        if (newCost > Number(updatedProject.budget)) {
            setErrors({
                budget: "Orçamento ultrapassado, verifique o valor do serviço!"
            })
            return
        }

        updatedProject.cost = newCost

        fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProject),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject({
                ...data,
                cost: data.cost || 0,
                services: data.services || []
            })
            setShowServiceForm(false)
            setMessage('Serviço adicionado com sucesso!')
            setType('success')
        })
        .catch((err) => console.log(err))
    }

    function removeService(id, cost) {

        const serviceCost = Number(cost)
        const currentCost = Number(project.cost)

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = {
            ...project,
            services: servicesUpdated,
            cost: currentCost - serviceCost
        }

        // UI imediata
        setProject(projectUpdated)

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => {
            if (!resp.ok) throw new Error('Erro ao remover serviço')
        })
        .then(() => {
            setMessage('Serviço removido com sucesso!')
            setType('success')
        })
        .catch((err) => {
            console.error(err)
            setMessage('Erro ao remover serviço')
            setType('error')
        })
    }

    function formatCurrency(value) {
        if (value === null || value === undefined) return 'R$ 0,00'

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    function editPost(project) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto editado com sucesso!')
            setType('success')
        })
        .catch((err) => console.log(err))
    }

    return (
        <section className={styles.container_project}>
            {message && <Message type={type} msg={message} />}

            <div className={styles.container_project_name}>
                {project.name ? (
                    <h1>Projeto: <span>{project.name}</span></h1>  
                ) : (
                    <Loading />
                )}
            </div>
            
            <div>
                {!showProjectForm ? (
                    <div className={styles.details_project}>   
                        <p>
                            <span>Categoria:</span> {project.category?.name}
                        </p>
                        <p>
                            <span>Orçamento Disponível:</span> {formatCurrency(project.budget)}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> {formatCurrency(project.cost)}
                        </p>
                        <p>
                            <span>Total Disponível:</span> {formatCurrency((project.budget)-(project.cost))}
                        </p>
                    </div>
                ) : (
                    <div className={styles.form_container}>
                        <ProjectForm 
                            handleSubmit={editPost} 
                            btnText="Concluir edição" 
                            projectData={project}
                        />
                    </div>
                )}

                <div className={styles.button_project}>
                    <button onClick={toggleProjecForm}>
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                    </button>
                </div>
            </div>

            <div className={styles.container_service_name}>
                <h1>Serviços do Projeto</h1>
            </div>

            {showServiceForm && 
                <ServiceForm 
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    errors={errors}
                />
            }

            <div className={styles.button_project}>
                <button onClick={toggleServiceForm}>
                    {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                </button>
            </div>

            <div className={styles.details_services}>
                {project.services?.length > 0 &&
                    project.services.map((service) => (
                        <ServiceCard 
                            key={service.id}
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            handleRemove={removeService}
                            handleView={viewService}
                        />
                    ))
                }

                {project.services?.length === 0 && (
                    <p>Não há serviços cadastrados!</p>
                )}
            </div>

            {/* MODAL */}
            {selectedService && (
                <ServiceModal 
                    service={selectedService}
                    onClose={closeServiceModal}
                />
            )}
        </section>
    )
}

export default Project
