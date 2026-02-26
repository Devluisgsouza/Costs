import styles from './Loading.module.css'
import img from '../../img/loading_yellow.png'


function Loading() {
    return(
        <img src={img} alt="loading" className={styles.loader} />
    )
}


export default Loading