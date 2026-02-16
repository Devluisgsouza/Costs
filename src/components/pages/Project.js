import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'

import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'
import Message from  '../layout/Message'


function Project() {
    
    const {id} = useParams()

    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

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
                setProject(data)
            })
            .catch((err) => console.log(err))
            }, 500)
    }, [id])


    function toggleProjecForm() {
        setShowProjectForm(!showProjectForm)
    }


    function formatCurrency(value) {
        if (value === null || value === undefined) return 'R$ 0,00'

            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(value)
    }


    function editPost(project) {
        //budget valdation
        if(project.budget < project.cost) {
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

    return(
        <section className={styles.container_project}>
            <div className={styles.container_project_name}>
                {message && <Message type={type} msg={message}/>}
                {project.name ? (
                    <h1>Projeto: <span>{project.name}</span></h1>  
                ): (
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
                    </div>
                    
                ) : (
                    <div className={styles.form_container}>
                        <ProjectForm 
                            handleSubmit={editPost} 
                            btnText="Concluir edição" 
                            projectData={project}/>
                    </div>
                )}
                <div className={styles.button_project}>
                    <button onClick={toggleProjecForm}>
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                    </button>
                </div>
            </div>
        </section>
    )
}



export default Project