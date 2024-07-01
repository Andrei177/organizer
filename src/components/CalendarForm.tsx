import { useUnit } from 'effector-react'
import React from 'react'
import styles from '../assets/styles/CalendarForm.module.css'
import { $calendarEventStore, setEndDate, setFullDay, setStartDate, setTitle } from '../store/calendarEventStore'
import Button from './UI/Button'
import { addEvent } from '../store/calendarStore'
import { ICalendarEvent } from '../models/ICalendarEvent'

interface IPropsCalendarForm {
  setShowModal: (bool: boolean) => void
}

const CalendarForm: React.FC<IPropsCalendarForm> = ({ setShowModal }) => {

  const [calendarEvent, onSetTitle, onSetStartDate, onSetEndDate, onSetFullDay] =
  useUnit([$calendarEventStore, setTitle, setStartDate, setEndDate, setFullDay])
  const [onAddEvent] = useUnit([addEvent])

    const saveEvent = () => {
      setShowModal(false);
      
      const newEvent: ICalendarEvent = {
        id: Date.now(),
        title: calendarEvent.title,
        startDate: calendarEvent.startDate,
        endDate: calendarEvent.endDate,
        fullDay: calendarEvent.fullDay
      }
      onAddEvent(newEvent);
    }

  return (
    <div className={styles['calendar-form']}>
      <h3>Новое мероприятие</h3>
      <input
        className={styles['calendar-form__inp']}
        type="text" placeholder='Наименование'
        value={calendarEvent.title}
        onChange={(e) => onSetTitle(e.target.value)}
      />
      <h4>Дата и время начала</h4>
      <input
        className={styles['calendar-form__inp']}
        type="datetime-local"
        value={calendarEvent.startDate?.toString()}
        onChange={(e) => onSetStartDate(e.target.value)}
      />
      <h4>Дата и время окончания</h4>
      <input
        className={styles['calendar-form__inp']}
        type="datetime-local"
        value={calendarEvent.endDate}
        disabled={calendarEvent.fullDay}
        onChange={(e) => {
          onSetEndDate(e.target.value)
          console.log(e.target.value)
        }}
      />

      <Button onClick={() => setShowModal(false)}>Отменить</Button>
      <Button onClick={saveEvent} disabled={!(calendarEvent.title && calendarEvent.startDate && calendarEvent.endDate)}>Сохранить</Button>
      <input type="checkbox" checked={calendarEvent.fullDay} onChange={(e) => {
        onSetFullDay(e.target.checked)
        if(e.target.checked && calendarEvent.startDate) {
          onSetEndDate(calendarEvent.startDate.toString().slice(0, 11) + "23:59")
        }
      }} /><span>Целый день</span>
    </div>
  )
}

export default CalendarForm
