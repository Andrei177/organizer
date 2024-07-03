import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/styles/TopPanel.module.css'

const TopPanel: React.FC = () => {
  const navigate = useNavigate();

  // const onSetOffsetTop = useUnit(setOffsetTop)

  // const topRef = useRef();

  // useEffect(() => {
  //   onSetOffsetTop(+topRef.current.clientHeight);
  // }, [])
  return (
    <h1 className={styles['top-panel']} onClick={() => navigate("/")} 
    //ref={topRef}
    >
      Органайзер
    </h1>
  )
}

export default TopPanel