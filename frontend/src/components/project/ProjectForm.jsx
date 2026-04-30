import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'
import { useState, useEffect } from 'react'

const API_URL = process.env.REACT_APP_API_URL

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetch(`${API_URL}/categories`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch(err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()

        let newErrors = {}

        if (!project.name || project.name.trim() === "") {
            newErrors.name = "O nome do projeto é obrigatório"
        }

        if (!project.budget || project.budget <= 0) {
            newErrors.budget = "O orçamento deve ser maior que zero"
        }

        if (!project.category || !project.category.id) {
            newErrors.category = "Selecione uma categoria"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto" 
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <Input 
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total" 
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            {errors.budget && <p className={styles.error}>{errors.budget}</p>}

            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            {errors.category && <p className={styles.error}>{errors.category}</p>}

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm
