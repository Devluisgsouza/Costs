import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsGrid,
  BsGridFill,
  BsBuilding,
  BsBuildingFill,
  BsChatDots,
  BsChatDotsFill,
} from 'react-icons/bs'

const items = [
  { to: '/', label: 'Home', Icon: BsHouseDoor, ActiveIcon: BsHouseDoorFill, end: true },
  { to: '/projects', label: 'Projetos', Icon: BsGrid, ActiveIcon: BsGridFill },
  { to: '/company', label: 'Empresa', Icon: BsBuilding, ActiveIcon: BsBuildingFill },
  { to: '/contact', label: 'Contato', Icon: BsChatDots, ActiveIcon: BsChatDotsFill },
]

function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      {items.map(({ to, label, Icon, ActiveIcon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            isActive ? `${styles.item} ${styles.active}` : styles.item
          }
        >
          {({ isActive }) => (
            <>
              <span className={styles.icon}>
                {isActive ? <ActiveIcon /> : <Icon />}
              </span>
              <span className={styles.label}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
