import styles from './Footer.module.css'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { BsBoxes } from 'react-icons/bs'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>
            <BsBoxes />
          </span>
          <div>
            <strong className={styles.name}>
              Costs<span className={styles.dot}>.</span>
            </strong>
            <p className={styles.copy}>Todos os direitos reservados © 2026</p>
          </div>
        </div>

        <ul className={styles.social}>
          <li>
            <a href="https://github.com/Devluisgsouza" aria-label="GitHub">
              <FaGithub />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/luis-guilherme-de-souza-7b5a75318/" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="https://wa.me/5512978145677" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
