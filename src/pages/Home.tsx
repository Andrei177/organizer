import React from 'react'
import CalendarWidget from '../components/widgets/CalendarWidget'
import TodoListWidget from '../components/widgets/TodoListWidget'
import styles from '../assets/styles/Home.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles['home']}>
      <CalendarWidget/>
      <TodoListWidget/>
    </div>
  )
}

export default Home