import styles from './Company.module.css'




function Company() {
    return(
         <div className={styles.company_container}>
            <h1>COSTS</h1>
            <h3>QUAL O NOSSO PROPÓSITO?</h3>
            <div className={styles.text_container}>
                <p>
                    A <span>Costs</span> nasceu da união entre aprendizado e propósito. Criada por um desenvolvedor júnior com o objetivo de aprimorar 
                    suas habilidades em React, a plataforma foi pensada não apenas como um projeto de estudo, mas como uma solução real para quem
                    precisa organizar, planejar e controlar os custos de projetos de forma simples e eficiente.
                </p>
                <p>
                    Mais do que um sistema, a <span>Costs</span> representa a evolução contínua no desenvolvimento de software aliada à vontade de gerar 
                    impacto positivo. A ferramenta permite que qualquer pessoa (de estudantes a empreendedores) possa gerenciar os custos de projetos 
                    de qualquer tipo, trazendo mais clareza, controle financeiro e organização para transformar ideias em realidade.
                </p>
                <p>
                    Acreditamos que tecnologia deve ser acessível, funcional e construída com propósito. Por isso, a <span>Costs</span> segue em constante evolução, 
                    sempre buscando melhorias, novas funcionalidades e uma experiência cada vez mais intuitiva para seus usuários.
                </p>
            </div>
            <h4>Desenvolvedor responsável: <span>Luis Guilherme de Souza</span></h4>
        </div>
    )
}

export default Company