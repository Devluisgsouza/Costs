import { useState } from 'react'
import styles from './LoginScreen.module.css'
import Button from '../components/ui/Button'
import { useUserSession } from '../context/SessionContext'
import { BsBoxes, BsArrowRight, BsEye, BsEyeSlash } from 'react-icons/bs'

const USERNAME_REGEX = /^[A-Za-z0-9_.-]+$/

function LoginScreen() {
  const { login } = useUserSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    const u = username.trim()

    if (u.length < 3) e.username = 'O usuário deve ter no mínimo 3 caracteres'
    else if (!USERNAME_REGEX.test(u)) e.username = 'Use apenas letras, números, "." "_" ou "-"'

    if (password.length < 4) e.password = 'A senha deve ter no mínimo 4 caracteres'

    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setLoading(true)
    // pequena animação de loading antes de entrar
    setTimeout(() => {
      const result = login(username, password)
      if (!result.ok) {
        setErrors({ password: result.error })
        setLoading(false)
      }
      // sucesso: o app troca de tela automaticamente
    }, 600)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <BsBoxes />
        </div>

        <h1 className={styles.title}>
          Bem-vindo ao <span>Costs</span>
        </h1>
        <p className={styles.subtitle}>Gerencie os custos dos seus projetos.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              placeholder="Ex: luis.souza"
              value={username}
              autoFocus
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                Entrar <BsArrowRight />
              </>
            )}
          </Button>
        </form>

        <p className={styles.note}>
          Novo por aqui? Basta entrar — sua conta é criada automaticamente.
        </p>
      </div>
    </div>
  )
}

export default LoginScreen
