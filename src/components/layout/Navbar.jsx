import { NavLink } from 'react-router-dom'
import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

function Navbar() {
    return(
        <nav className={styles.navbar}>
            <Container>
                <NavLink className={styles.imglogo} to="/">
                    <img src={logo} alt="Costs" />
                    <h1>COSTS</h1>
                </NavLink>

                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink 
                          to="/" 
                          className={({ isActive }) => 
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                          }
                        >
                          Home
                        </NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink 
                          to="/projects"
                          className={({ isActive }) => 
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                          }
                        >
                          Projetos
                        </NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink 
                          to="/company"
                          className={({ isActive }) => 
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                          }
                        >
                          Empresa
                        </NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink 
                          to="/contact"
                          className={({ isActive }) => 
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                          }
                        >
                          Contato
                        </NavLink>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar