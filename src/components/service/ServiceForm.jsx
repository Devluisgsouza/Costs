import styles from '../project/ProjectForm.module.css'
import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

function ServiceForm({ handleSubmit, btnText, errors }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        handleSubmit(service)
    }
    
    function handleChange(e) {
        setService({ 
            ...service, 
            [e.target.name]: e.target.value 
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>

            <Input 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}    
                value={service.name || ''}
            />
            {errors?.name && <p className={styles.error}>{errors.name}</p>}

            <Input 
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o custo do serviço"
                handleOnChange={handleChange}    
                value={service.cost || ''}
            />
            {errors?.cost && <p className={styles.error}>{errors.cost}</p>}
            {errors?.budget && <p className={styles.error}>{errors.budget}</p>}

            <Input 
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}    
                value={service.description || ''}
            />
            {errors?.description && <p className={styles.error}>{errors.description}</p>}


            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm
