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
                    <a href="https://github.com/Devluisgsouza"><FaGithub /></a>
                </li>
                <li>
                    <a href="https://linkedin.com/in/luis-guilherme-de-souza-7b5a75318/"><FaLinkedin /></a>
                </li>
                <li>
                    <a href="https://wa.me/5512978145677"><FaWhatsapp /></a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer