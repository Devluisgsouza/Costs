import styles from './Projects.module.css'
import Message from "../layout/Message"
import { useLocation } from 'react-router-dom'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

const API_URL = process.env.REACT_APP_API_URL

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            fetch(`${API_URL}/projects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        }, 500)
    }, [])

    function removeProject(id) {
        fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.container_projects}>
            <div className={styles.container_message}>
                {message && <Message type="success" msg={message}/>}     
                {projectMessage && <Message type="success" msg={projectMessage}/>}           
            </div>
            <h1>MEUS PROJETOS</h1>
            <section>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </section>
            <LinkButton to="/newproject" text="Criar Novo Projeto"/>
        </div>
    )
}

export default Projects
