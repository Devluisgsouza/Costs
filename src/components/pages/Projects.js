import styles from './Projects.module.css'
import Message from "../layout/Message"
import { useLocation } from 'react-router-dom'


function Projects() {

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    return (
    <div className={styles.container_projects}>
        <div className={styles.container_message}>
            {message && <Message type="success" msg={message}/>}        
        </div>
        <h1>MEUS PROJETOS</h1>
    </div>
    )
}

export default Projects
