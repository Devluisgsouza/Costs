import styles from './Projects.module.css'
import Message from "../layout/Message"
import { useLocation } from 'react-router-dom'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'


function Projects() {

    const[projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(data)
        })
        .catch((err) => console.log(err))
    }, [])

    return (
    <div className={styles.container_projects}>
        <div className={styles.container_message}>
            {message && <Message type="success" msg={message}/>}        
        </div>
        <h1>MEUS PROJETOS</h1>
        <section>
            {projects.length > 0 &&
            projects.map((projects) => (
                <ProjectCard 
                    id={projects.id}
                    name={projects.name}
                    budget={projects.budget}
                    category={projects.category.name}
                    key={projects.id}
                />
            ))}
        </section>
        <LinkButton to="/newproject" text="Criar Novo Projeto"/>
    </div>
    )
}

export default Projects
