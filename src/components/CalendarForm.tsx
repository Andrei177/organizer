import { useUnit } from 'effector-react'
import React from 'react'
import styles from '../assets/styles/Calendar.module.css'
import { $calendarEventStore, setEndDate, setFullDay, setStartDate, setTitle } from '../store/calendarEventStore'
import Button from './UI/Button'

interface IPropsCalendarForm{
    setShowModal: (bool: boolean) => void
}

const CalendarForm: React.FC<IPropsCalendarForm> = ({setShowModal}) => {

    const [calendarEvent, onSetTitle, onSetStartDate, onSetEndDate, onSetFullDay] = 
    useUnit([$calendarEventStore, setTitle, setStartDate, setEndDate, setFullDay]);

  return (
    <div className={styles['calendar-form']}>
        <h3>Новое дело</h3>

        <input 
          className={styles['calendar-form__inp']} 
          type="text" placeholder='Наименование' 
          value={calendarEvent.title} 
          onChange={(e) => onSetTitle(e.target.value)}
        />
        <input 
          className={styles['calendar-form__inp']} 
          type="datetime-local" 
          value={calendarEvent.startDate?.toString()} 
          onChange={(e) => onSetStartDate(e.target.value)}
        />
        <input 
          className={styles['calendar-form__inp']} 
          type="datetime-local" 
          value={calendarEvent.endDate} 
          onChange={(e) => {
            onSetEndDate(e.target.value)
            console.log(e.target.value)
        }}
        />

        <Button onClick={() => setShowModal(false)}>Отменить</Button>
        <Button disabled={!(calendarEvent.title && calendarEvent.startDate && calendarEvent.endDate)}>Сохранить</Button>
        <input type="checkbox" checked={calendarEvent.fullDay} onChange={(e) => onSetFullDay(e.target.checked)}/><span>Полный день</span>
    </div>
  )
}

export default CalendarForm
