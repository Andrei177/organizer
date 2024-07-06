import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'
import styles from '../../../assets/styles/CalendarForm.module.css'
import { $calendarEventStore, setEmptyEvent, setEndDate, setFullDay, setIsEditing, setStartDate, setTitle } from '../store/calendarEventStore'
import Button from '../../../UI/Button'
import { addEventServer, removeEventServer, setShowCalendarForm, updateEventServer } from '../../../pages/Calendar/store/calendarStore'
import { closeModal } from '../../../components/Modal/helpers/closeModal'
import { setNoticeMessage, setShowNotice } from '../../Notification/store/noticeStore'
import { handlerRemoveEvent, saveEvent } from '../helpers/handlers'

const CalendarForm: FC = () => {

  const [calendarEventStore, onSetTitle, onSetStartDate, onSetEndDate, onSetFullDay, onSetIsEditing] =
    useUnit([$calendarEventStore, setTitle, setStartDate, setEndDate, setFullDay, setIsEditing])
  const [onSetEmptyEvent, onSetShowCalendarForm, onAddEventServer, onUpdateEventServer, onRemoveEventServer] =
    useUnit([setEmptyEvent, setShowCalendarForm, addEventServer, updateEventServer, removeEventServer])

  const [onSetNoticeMessage, onSetShowNotice] = useUnit([setNoticeMessage, setShowNotice])

  useEffect(() => {
    if (calendarEventStore.event.fullDay && calendarEventStore.event.startDate) {
      onSetEndDate(calendarEventStore.event.startDate.toString().slice(0, 11) + "23:59")
    }
  }, [calendarEventStore.event.startDate, calendarEventStore.event.fullDay])

  return (
    <div className={styles['calendar-form']}>
      {calendarEventStore.isEditing && <h3>Редактирование события</h3>}
      {(!calendarEventStore.isEditing && !calendarEventStore.isReading) && <h3>Новое событе</h3>}
      {calendarEventStore.isReading && <h3>Чтение события</h3>}
      <input
        className={styles['calendar-form__inp']}
        type="text" placeholder='Наименование'
        value={calendarEventStore.event.title}
        disabled={calendarEventStore.isReading}
        onChange={(e) => onSetTitle(e.target.value)}
      />
      <h4>Дата и время начала</h4>
      <input
        className={styles['calendar-form__inp']}
        type="datetime-local"
        disabled={calendarEventStore.isReading}
        value={calendarEventStore.event.startDate?.toString()}
        onChange={(e) => onSetStartDate(e.target.value)}
      />
      <h4>Дата и время окончания</h4>
      <input
        className={styles['calendar-form__inp']}
        type="datetime-local"
        value={calendarEventStore.event.endDate}
        disabled={calendarEventStore.event.fullDay || calendarEventStore.isReading}
        onChange={(e) => onSetEndDate(e.target.value)}
      />

      <Button
        disabled={calendarEventStore.isReading}
        onClick={() => closeModal(onSetShowCalendarForm, onSetIsEditing, onSetEmptyEvent)}
      >
        Отменить
      </Button>
      <Button
        onClick={() => saveEvent({
          calendarEventStore,
          onUpdateEventServer,
          onSetNoticeMessage,
          onSetShowNotice,
          onAddEventServer,
          onSetShowCalendarForm,
          onSetIsEditing,
          onSetEmptyEvent,
        })}
        disabled={
          !(!calendarEventStore.isReading && calendarEventStore.event.title
            && calendarEventStore.event.startDate
            && calendarEventStore.event.endDate
            && (new Date(String(calendarEventStore.event.startDate)) <= new Date(String(calendarEventStore.event.endDate)))
          )
        }
      >
        Сохранить
      </Button>
      <input
        disabled={calendarEventStore.isReading}
        type="checkbox"
        checked={calendarEventStore.event.fullDay}
        onChange={(e) => onSetFullDay(e.target.checked)} /><span>Целый день</span>
      {
        calendarEventStore.isEditing && <Button
          disabled={calendarEventStore.isReading}
          onClick={() => handlerRemoveEvent({
            calendarEventStore,
            onRemoveEventServer,
            onSetNoticeMessage,
            onSetShowNotice,
            onSetShowCalendarForm,
            onSetIsEditing,
            onSetEmptyEvent
          })}
        >
          Удалить
        </Button>
      }
    </div>
  )
}

export default CalendarForm