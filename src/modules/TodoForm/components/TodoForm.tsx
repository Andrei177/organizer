import { FC } from 'react'
import Button from '../../../UI/Button'
import styles from '../../../assets/styles/TodoForm.module.css'
import { useUnit } from 'effector-react';
import { $todoStore, setDescription, setEmptyTodo, setEventId, setIsEditing, setName, setStatus } from '../store/todoStore';
import { addTodoServer, removeTodoServer, setShowTodoForm, updateTodoServer } from '../../../pages/TodoList/store/todoListStore';
import { $calendarStore } from '../../../pages/Calendar/store/calendarStore';
import { closeModal } from '../../../components/Modal/helpers/closeModal';
import { handlerRemoveTodo, saveTodo } from '../helpers/handlers';
import { setNoticeMessage, setShowNotice } from '../../Notification/store/noticeStore';

const TodoForm: FC = () => {

  const [todoStore, onSetName, onSetEventId, onSetDescription, onSetStatus, onSetEmptyTodo, onSetIsEditing] = useUnit([
    $todoStore, setName, setEventId, setDescription, setStatus, setEmptyTodo, setIsEditing
  ]);
  const calendarStore = useUnit($calendarStore);

  const [onSetShowTodoForm, onAddTodoServer, onUpdateTodoServer, onRemoveTodoServer] = useUnit([
    setShowTodoForm, addTodoServer, updateTodoServer, removeTodoServer
  ]);

  const [onSetNoticeMessage, onSetShowNotice] = useUnit([
    setNoticeMessage, setShowNotice
  ]);

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
        onChange={e => onSetEventId(e.target.value)}
        defaultValue={""}
      >
        <option value={""}>Без события</option>
        {
          calendarStore.events.map(event =>
            <option
              key={event.id}
              value={String(event.id)}
            >
              {event.title.length > 20 ? event.title.slice(0, 20) + "..." : event.title}
            </option>
          )
        }
      </select>

      <Button onClick={() => closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo)}>Отменить</Button>
      <Button
        onClick={() => saveTodo({
          todoStore,
          onUpdateTodoServer,
          onSetNoticeMessage,
          onSetShowNotice,
          onAddTodoServer,
          onSetShowTodoForm,
          onSetIsEditing,
          onSetEmptyTodo
        })}
        disabled={!todoStore.todo.name}
      >
        Сохранить
      </Button>
      <div style={{display: "flex", gap: 10}}>
        <input type="checkbox" checked={todoStore.todo.status} onChange={(e) => onSetStatus(e.target.checked)} />
        <h3>Завершено</h3>
      </div>
      {
        todoStore.isEditing && <Button
          onClick={() => handlerRemoveTodo({
            todoStore,
            onRemoveTodoServer,
            onSetNoticeMessage,
            onSetShowNotice,
            onAddTodoServer,
            onSetShowTodoForm,
            onSetIsEditing,
            onSetEmptyTodo
          })}
        >
          Удалить
        </Button>
      }
    </div>
  )
}

export default TodoForm