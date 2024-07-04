import { FC } from 'react'
import TodoListItem from '../../../modules/TodoForm/components/TodoListItem'
import { $todoListStore, setShowTodoForm } from '../store/todoListStore'
import { useUnit } from 'effector-react'
import Modal from '../../../components/Modal/Modal'
import TodoForm from '../../../modules/TodoForm/components/TodoForm'
import Button from '../../../UI/Button'
import todoItemStyle from '../../../assets/styles/TodoListItem.module.css'
import styles from '../../../assets/styles/TodoList.module.css'
import { setEmptyTodo, setIsEditing } from '../../../modules/TodoForm/store/todoStore'
import CalendarForm from '../../../modules/CalendarForm/components/CalendarForm'
import { $calendarStore, setShowCalendarForm } from '../../Calendar/store/calendarStore'
import { setEmptyEvent, setIsReading } from '../../../modules/CalendarForm/store/calendarEventStore'

const TodoList: FC = () => {
  const [todoList, onSetShowTodoForm] = useUnit([$todoListStore, setShowTodoForm])
  const [onSetIsEditing, onSetEmptyTodo, ] = useUnit([setIsEditing, setEmptyTodo])
  const [onSetShowCalendarForm, calendarStore, ] = useUnit([setShowCalendarForm, $calendarStore])
  const [onSetIsReading, onSetEmptyEvent] = useUnit([setIsReading, setEmptyEvent])

  const createTodo = () => {
    onSetShowTodoForm(true);
  }

  return (
    <>
      <div className={styles['todolist']}>
        <h1 style={{ textAlign: "center" }}>Список дел</h1>
        <Button onClick={() => createTodo()}>Создать</Button>
        <div className={styles['todolist-wrapper']}>
          <div className={styles['todolist-table']}>
            <div className={todoItemStyle['todolist-item']}>Наименование</div>
            <div className={todoItemStyle['todolist-item']}>Описание</div>
            <div className={todoItemStyle['todolist-item']}>Событие</div>
            <div className={todoItemStyle['todolist-item']}>Статус</div>
            <div className={todoItemStyle['todolist-item']}>Ред...</div>
            {
              todoList.todos.map(todo => (
                <TodoListItem 
                  key={todo.id} 
                  todo={todo}
                />)
              )
            }
          </div>
        </div>

      </div>
      <Modal 
        showModal={todoList.showTodoForm} 
        setShowModal={onSetShowTodoForm} 
        setIsEditing={onSetIsEditing} 
        setEmptyForm={onSetEmptyTodo}
      >
        <TodoForm/>
      </Modal>
      <Modal 
        showModal={calendarStore.showCalendarForm} 
        setShowModal={onSetShowCalendarForm} 
        setIsReading={onSetIsReading}
        setEmptyForm={onSetEmptyEvent}
      >
        <CalendarForm/>
      </Modal>
    </>
  )
}

export default TodoList