import React from 'react'
import Button from './UI/Button'
import styles from '../assets/styles/TodoForm.module.css'
import { useUnit } from 'effector-react';
import { $todoStore, setDescription, setEmptyTodo, setEmptyTodoEvent, setEvent, setIsEditing, setName, setStatus } from '../store/todoStore';
import { addTodo, removeTodo, setShowTodoForm, updateTodo } from '../store/todoListStore';
import { ITodo } from '../models/ITodo';
import { $calendarStore } from '../store/calendarStore';
import { closeModal } from '../helpers/closeModal';

const TodoForm: React.FC = () => {

  const [todoStore, onSetName, onSetEvent, onSetDescription, onSetStatus, onSetEmptyTodo, onSetIsEditing, onSetEmptyTodoEvent] = useUnit([
    $todoStore, setName, setEvent, setDescription, setStatus, setEmptyTodo, setIsEditing, setEmptyTodoEvent
  ]);
  const [onAddTodo, onUpdateTodo, onRemoveTodo, onSetShowTodoForm] = useUnit([
    addTodo, updateTodo, removeTodo, setShowTodoForm
  ]);
  const [calendarStore] = useUnit([$calendarStore]);

  const saveTodo = () => {
    if(todoStore.isEditing){
      onUpdateTodo(todoStore.todo)
    }
    else{
      const newTodo: ITodo = {
        id: Date.now(),
        name: todoStore.todo.name,
        description: todoStore.todo.description,
        event: todoStore.todo.event,
        status: todoStore.todo.status
      }
      onAddTodo(newTodo);
    }
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
        onChange={e => e.target.value === "" ? onSetEmptyTodoEvent() :onSetEvent(JSON.parse(e.target.value))}
        defaultValue={"Выберите событие"}
      >
        <option value={""}>Без события</option>
        {
          calendarStore.events.map(event => <option key={event.id} value={JSON.stringify(event)}>{event.title}</option>)
        }
      </select>

      <Button onClick={() => closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo)}>Отменить</Button>
      <Button onClick={saveTodo} disabled={!todoStore.todo.name}>Сохранить</Button>
      <input type="checkbox" checked={todoStore.todo.status} onChange={(e) => onSetStatus(e.target.checked)} /><span>Завершено</span>
      {
        todoStore.isEditing && <Button
          onClick={() => {
            onRemoveTodo(todoStore.todo)
            closeModal(onSetShowTodoForm, onSetIsEditing, onSetEmptyTodo)
          }}
        >
          Удалить
        </Button>
      }
    </div>
  )
}

export default TodoForm