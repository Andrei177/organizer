import { FC } from 'react'
import styles from '../assets/styles/Spinner.module.css'

const Spinner: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['spinner']}></div>
        </div>
    )
}

export default Spinner
