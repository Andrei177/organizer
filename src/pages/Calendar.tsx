import React, { useState } from 'react'
import styles from '../assets/styles/Calendar.module.css'
import CalendarComponent from 'react-calendar';
import Button from '../components/UI/Button';
import Modal from '../components/Modal';
import CalendarForm from '../components/CalendarForm';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: React.FC = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, onChange] = useState<Value>(new Date());

  const createEvent = () => {
    setShowModal(true);
  }

  return (
    <div className={styles['calendar']}>
      <h1 className={styles['calendar-title']}>Календарь</h1>
      <CalendarComponent value={value} onChange={onChange}/>
      <Button onClick={createEvent}>Создать</Button>
      <Modal showModal={showModal}>
        <CalendarForm setShowModal={setShowModal}/>
      </Modal>
    </div>
  )
}

export default Calendar