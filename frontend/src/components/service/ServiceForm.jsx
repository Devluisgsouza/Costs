import styles from '../project/ProjectForm.module.css'
import { useState } from 'react'
import Input from '../form/Input'
import Button from '../ui/Button'

function ServiceForm({ handleSubmit, btnText, errors }) {
  const [service, setService] = useState({})

  function submit(e) {
    e.preventDefault()
    handleSubmit(service)
  }

  function handleChange(e) {
    setService({
      ...service,
      [e.target.name]: e.target.value,
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
        maxLength={60}
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
        maxLength={200}
      />
      {errors?.description && <p className={styles.error}>{errors.description}</p>}

      <Button type="submit" size="lg">
        {btnText}
      </Button>
    </form>
  )
}

export default ServiceForm
