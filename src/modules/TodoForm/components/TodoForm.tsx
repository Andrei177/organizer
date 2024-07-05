import { FC } from 'react'
import Button from '../../../UI/Button'
import styles from '../../../assets/styles/TodoForm.module.css'
import { useUnit } from 'effector-react';
import { $todoStore, setDescription, setEmptyTodo, setEmptyTodoEvent, setEvent, setIsEditing, setName, setStatus } from '../store/todoStore';
import { addTodo, removeTodo, setShowTodoForm, updateTodo } from '../../../pages/TodoList/store/todoListStore';
import { ITodo } from '../../../models/ITodo';
import { $calendarStore } from '../../../pages/Calendar/store/calendarStore';
import { closeModal } from '../../../components/Modal/helpers/closeModal';
import { setNoticeMessage, setShowNotice } from '../../Notification/store/noticeStore';

const TodoForm: FC = () => {

  const [todoStore, onSetName, onSetEvent, onSetDescription, onSetStatus, onSetEmptyTodo, onSetIsEditing, onSetEmptyTodoEvent] = useUnit([
    $todoStore, setName, setEvent, setDescription, setStatus, setEmptyTodo, setIsEditing, setEmptyTodoEvent
  ]);
  const [onAddTodo, onUpdateTodo, onRemoveTodo, onSetShowTodoForm] = useUnit([
    addTodo, updateTodo, removeTodo, setShowTodoForm
  ]);
  const [calendarStore] = useUnit([$calendarStore]);

  const [onSetNoticeMessage, onSetShowNotice] = useUnit([setNoticeMessage, setShowNotice])

  const saveTodo = () => {
    if (todoStore.isEditing) {
      onUpdateTodo(todoStore.todo)
      onSetNoticeMessage("Дело успешно отредактировано")
      onSetShowNotice(true)
    }
    else {
      const newTodo: ITodo = {
        id: Date.now(),
        name: todoStore.todo.name,
        description: todoStore.todo.description,
        event: todoStore.todo.event,
        status: todoStore.todo.status
      }
      onAddTodo(newTodo);
      onSetNoticeMessage("Дело успешно создано")
      onSetShowNotice(true)
    }
    closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo)
  }

  const handlerRemoveTodo = () => {
    onSetNoticeMessage("Дело успешно удалено")
    onSetShowNotice(true)
    onRemoveTodo(todoStore.todo)
    closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo)
  }

  return (
    <div className={styles['todo-form']}>
      {
        todoStore.isEditing
          ? <h3>Редактирование дела</h3>
          : <h3>Новое дело</h3>
      }
      <input
        className={styles['todo-form__inp']}
        type="text" placeholder='Наименование'
        value={todoStore.todo.name}
        onChange={(e) => onSetName(e.target.value)} />

      <textarea
        className={styles['todo-form__inp']}
        placeholder='Описание'
        value={todoStore.todo.description}
        onChange={(e) => onSetDescription(e.target.value)}
      />

      <select
        className={styles['todo-form__inp']}
        onChange={e => e.target.value === "" ? onSetEmptyTodoEvent() : onSetEvent(JSON.parse(e.target.value))}
        defaultValue={"Выберите событие"}
      >
        <option value={""} onClick={() => console.log("click")}>Без события</option>
        {
          calendarStore.events.map(event =>
            <option
              key={event.id}
              value={JSON.stringify(event)}
            >
              {event.title.length > 20 ? event.title.slice(0, 20) + "..." : event.title}
            </option>
          )
        }
      </select>

      <Button onClick={() => closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo)}>Отменить</Button>
      <Button onClick={saveTodo} disabled={!todoStore.todo.name}>Сохранить</Button>
      <input type="checkbox" checked={todoStore.todo.status} onChange={(e) => onSetStatus(e.target.checked)} /><span>Завершено</span>
      {
        todoStore.isEditing && <Button
          onClick={handlerRemoveTodo}
        >
          Удалить
        </Button>
      }
    </div>
  )
}

export default TodoForm