import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL

function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {

        project.cost = 0
        project.services = []

        fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate(`/project/${data.id}`, { state: { message: 'Projeto criado com sucesso!' } })
            })
            .catch((err) => console.log(err))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie o seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject
