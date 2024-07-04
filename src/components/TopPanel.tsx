import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/styles/TopPanel.module.css'

const TopPanel: FC = () => {
  const navigate = useNavigate();
  return (
    <h1 className={styles['top-panel']} onClick={() => navigate("/")} >
      Органайзер
    </h1>
  )
}

export default TopPanel