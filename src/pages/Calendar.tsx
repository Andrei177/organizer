import React from 'react'
import styles from '../assets/styles/Calendar.module.css'

const Calendar: React.FC = () => {
  return (
    <div className={styles['calendar']}>
      <h1 className={styles['calendar-title']}>Календарь</h1>
    </div>
  )
}

export default Calendar