import styles from './Home.module.css';
import cashs from '../../img/cashs.png';
import LinkButton from '../layout/LinkButton';


function Home() {
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>COSTS</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={cashs} alt="Costs" />
            <p><span>O bom gerenciamento de um projeto é a chave para o seu sucesso!</span></p>
        </section>
    )
}

export default Home