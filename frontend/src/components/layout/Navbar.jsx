import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import UserBadge from './UserBadge'
import { BsBoxes } from 'react-icons/bs'

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.logoArea}>
          <NavLink className={styles.logo} to="/">
            <span className={styles.logoIcon}>
              <BsBoxes />
            </span>
            <span className={styles.logoText}>
              Costs<span className={styles.dot}>.</span>
            </span>
          </NavLink>
        </div>

        <ul className={styles.list}>
          <li>
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={linkClass}>
              Projetos
            </NavLink>
          </li>
          <li>
            <NavLink to="/company" className={linkClass}>
              Empresa
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass}>
              Contato
            </NavLink>
          </li>
        </ul>

        <div className={styles.userArea}>
          <UserBadge />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
