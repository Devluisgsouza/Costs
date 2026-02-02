import styles from './Footer.module.css'

import { FaGithub, FaLinkedin, FaWhatsapp} from 'react-icons/fa'


function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.message}>
                <h1>COSTS</h1>
                <p>All rights reserved © 2026</p>
            </div>
            <ul className={styles.social_list}>
                <li>
                    <FaGithub />
                </li>
                <li>
                    <FaLinkedin />
                </li>
                <li>
                    <FaWhatsapp />
                </li>
            </ul>
        </footer>
    )
}

export default Footer