import { FC } from 'react'
import styles from '../../../assets/styles/TodoListItem.module.css'
import Img from '../../../UI/Img'
import edit from '../../../assets/edit.svg'
import { ITodo } from '../../../models/ITodo'
import { useUnit } from 'effector-react'
import { setShowTodoForm } from '../store/todoListStore'
import { setIsEditing, setTodo } from '../../../modules/TodoForm/store/todoStore'
import { setShowCalendarForm } from '../../Calendar/store/calendarStore'
import { ICalendarEvent } from '../../../models/ICalendarEvent'
import { setEvent, setIsReading } from '../../../modules/CalendarForm/store/calendarEventStore'

interface IPropsTodoListItem{
  todo: ITodo,
  mini?: boolean
}

const TodoListItem: FC<IPropsTodoListItem> = ({todo, mini}) => {

  const [onSetShowTodoForm] = useUnit([setShowTodoForm]);
  const [onSetTodo, onSetIsEditing] = useUnit([setTodo, setIsEditing]);

  const [onSetEvent, onSetIsReading] = useUnit([setEvent, setIsReading])
  const [onSetShowCalendarForm] = useUnit([setShowCalendarForm])

  const editTodo = () => {
    onSetTodo(todo);
    onSetShowTodoForm(true);
    onSetIsEditing(true);
  }
  const showInfoEvent = (event: ICalendarEvent) => {
    if(event.id){
      onSetIsReading(true)
      onSetShowCalendarForm(true)
      onSetEvent(event)
    }
  }

  return (
    <>
    {
      mini
      ?<>
        <div className={styles['todolist-item']}>{todo.name}</div>
        <div className={styles['todolist-item']}>{todo.status ? <>V</> : <>X</>}</div>
      </>
      :
      <>
        <div className={styles['todolist-item']}>{todo.name}</div>
        <div className={styles['todolist-item']}>{todo.description}</div>
        <div className={styles['todolist-item'] + " " + styles['event']} onClick={() => showInfoEvent(todo.event)}>{todo.event.title}</div>
        <div className={styles['todolist-item']}>{todo.status ? <>V</> : <>X</>}</div>
        <div className={styles['todolist-item'] + " " + styles['edit']} onClick={editTodo}>
          <Img img={edit}/>
        </div>
      </>
    }
    </>
  )
}

export default TodoListItem
