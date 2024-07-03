import React from 'react'
import styles from '../assets/styles/Home.module.css'
import Draggable from 'react-draggable'

const Home: React.FC = () => {
  return (
    <div className={styles['home']}>
      <h1 className={styles['home-title']}>Главная</h1>

      <Draggable bounds='parent'>
        <div className="test">
          Мини календарь
        </div>
      </Draggable>
      <Draggable bounds='parent'>
        <div className="test">
          Мини список дел
        </div>
      </Draggable>
    </div>
  )
}

export default Home