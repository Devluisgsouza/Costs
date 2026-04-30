import styles from './Contact.module.css'
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram} from 'react-icons/fa'



function Contact() {
    return(
        <div className={styles.project_container}>
            <h1>Contatos</h1>
            <section className={styles.social_list_contaier}>
                <ul>
                    <li>
                        <a href="https://github.com/Devluisgsouza"><FaGithub /></a>
                        <p>GITHUB</p>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/luis-guilherme-de-souza-7b5a75318/"><FaLinkedin /></a>
                        <p>LINKEDIN</p>
                    </li>
                    <li>
                        <a href="https://wa.me/5512978145677"><FaWhatsapp /></a>
                        <p>WHATSAPP</p>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/luispgdh_/"><FaInstagram /></a>
                        <p>INSTAGRAM</p>
                    </li>
                </ul>
            </section>
            <h2>Entre em contato e me acompanhe nas redes sociais!</h2>
        </div>
    )
}

export default Contact


