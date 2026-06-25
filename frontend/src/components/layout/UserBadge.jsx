import styles from './UserBadge.module.css'
import { useUserSession } from '../../context/SessionContext'
import { getInitials } from '../../lib/format'
import { BsBoxArrowRight } from 'react-icons/bs'

function UserBadge() {
  const { user, logout } = useUserSession()

  if (!user) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar} title={user.username}>
        {getInitials(user.username)}
      </div>
      <span className={styles.name}>{user.username}</span>
      <button className={styles.logout} onClick={logout} title="Sair">
        <BsBoxArrowRight />
        <span className={styles.logoutText}>Sair</span>
      </button>
    </div>
  )
}

export default UserBadge
