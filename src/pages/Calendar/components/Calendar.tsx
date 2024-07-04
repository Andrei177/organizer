import { FC, useState } from 'react'
import styles from '../../../assets/styles/Calendar.module.css'
import CalendarComponent from 'react-calendar';
import Button from '../../../UI/Button';
import Modal from '../../../components/Modal/Modal';
import CalendarForm from '../../../modules/CalendarForm/components/CalendarForm';
import { useUnit } from 'effector-react';
import { $calendarStore, setShowCalendarForm } from '../store/calendarStore';
import { ICalendarEvent } from '../../../models/ICalendarEvent';
import { setEmptyEvent, setEvent, setIsEditing, setIsReading } from '../../../modules/CalendarForm/store/calendarEventStore';
import { renderTile } from '../helpers/renderTile';
import 'react-calendar/dist/Calendar.css';
import '../../../assets/styles/CalendarComponent.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: FC = () => {

  const [value, onChange] = useState<Value>(new Date());

  const [calendarStore, onSetShowCalendarForm] = useUnit([$calendarStore, setShowCalendarForm]);
  const [onSetEvent, onSetIsEditing, onSetEmptyEvent, onSetIsReading] = useUnit([setEvent, setIsEditing, setEmptyEvent, setIsReading]);

  const showInfoEvent = (event: ICalendarEvent) => {
    onSetShowCalendarForm(true);
    onSetEvent(event);
  }

  return (
    <div className={styles['calendar']}>
      <h1 className={styles['calendar-title']}>Календарь</h1>
      <CalendarComponent
        className={styles['calendar-component']}
        value={value}
        onChange={onChange}
        tileContent={(tile) => renderTile(tile.date, tile.view, calendarStore.events, showInfoEvent, onSetIsEditing)} />
      <Button onClick={() => onSetShowCalendarForm(true)}>Создать событие</Button>
      <Modal 
        showModal={calendarStore.showCalendarForm} 
        setShowModal={onSetShowCalendarForm} 
        setIsEditing={setIsEditing} 
        setEmptyForm={onSetEmptyEvent}
        setIsReading={onSetIsReading}
        >
        <CalendarForm/>
      </Modal>
    </div>
  )
}

export default Calendar