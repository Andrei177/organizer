import React, { useState } from 'react'
import styles from '../assets/styles/Calendar.module.css'
import CalendarComponent from 'react-calendar';
import Button from '../components/UI/Button';
import Modal from '../components/Modal';
import CalendarForm from '../components/CalendarForm';
import { useUnit } from 'effector-react';
import { $calendarStore } from '../store/calendarStore';
import { ICalendarEvent } from '../models/ICalendarEvent';
import { compareDatesWithoutTime } from '../helpers/compareDates';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: React.FC = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, onChange] = useState<Value>(new Date());
  const [calendarStore] = useUnit([$calendarStore]);

  const renderTile = (date: Date, view: string) => {
    if (view === 'month') {
      let arrEvents: ICalendarEvent[] = calendarStore.events.filter(event => {
        const startDate = new Date(String(event.startDate));
        const endDate = new Date(String(event.endDate));
        return ((date >= startDate || compareDatesWithoutTime(startDate, date)) && date <= endDate)
      })

      return <ul>
        {
          arrEvents.map(event => {
            const idRGB = event.id;
            const red = 128 + (idRGB % 128);
            const green = 128 + ((idRGB + 42) % 128);
            const blue = 128 + ((idRGB + 84) % 128);
            return <li key={event.id} style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}>{event.title}</li>
          })
        }
      </ul>
    }
  }

  return (
    <div className={styles['calendar']}>
      <h1 className={styles['calendar-title']}>Календарь</h1>
      <CalendarComponent value={value} onChange={onChange} tileContent={(tile) => renderTile(tile.date, tile.view)} />
      <Button onClick={() => setShowModal(true)}>Создать</Button>
      <Modal showModal={showModal}>
        <CalendarForm setShowModal={setShowModal} />
      </Modal>
    </div>
  )
}

export default Calendar