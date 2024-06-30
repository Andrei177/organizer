import React from 'react'
import Button from './UI/Button'
import styles from '../assets/styles/TodoForm.module.css'
import { useUnit } from 'effector-react';
import { $todoStore, setDescription, setEvent, setName, setStatus } from '../store/todoStore';
import { addTodo } from '../store/todoListStore';
import { ITodo } from '../models/ITodo';

interface IPropsTodoForm{
  setShowModal: (bool: boolean) => void;
}

const TodoForm: React.FC<IPropsTodoForm> = ({setShowModal}) => {

  const [todo, onSetName, onSetEvent, onSetDescription, onSetStatus] = useUnit([
    $todoStore, setName, setEvent, setDescription, setStatus
  ]); 
  const [onAddTodo] = useUnit([addTodo]);

  const addTodoInStore = () => {
    const newTodo: ITodo = {
      id: Date.now(),
      name: todo.name, 
      description: todo.description,
      event: todo.event,
      status: todo.status
    }
    setShowModal(false);
    onAddTodo(newTodo);
    onSetName("");
    onSetDescription("");
    onSetEvent("");
    onSetStatus(false);
  }

  return (
    <div className={styles['todo-form']}>
        <h3>Новое дело</h3>

        <input 
          className={styles['todo-form__inp']} 
          type="text" placeholder='Наименование' 
          value={todo.name} 
          onChange={(e) => onSetName(e.target.value)}/>

        <textarea 
          className={styles['todo-form__inp']} 
          placeholder='Описание'
          value={todo.description} 
          onChange={(e) => onSetDescription(e.target.value)}
          />

        <select 
          className={styles['todo-form__inp']} 
          name="" 
          id=""
          onChange={(e) => onSetEvent(e.target.value)}>
            {
            //Тут пока хз как работает, так как ещё нет типа события из календаря
            }
            <option value="Меро">Какое-то мероприятие</option>
        </select>

        <Button onClick={() => setShowModal(false)}>Отменить</Button>
        <Button onClick={addTodoInStore} disabled={!todo.name}>Сохранить</Button>
        <input type="checkbox" checked={todo.status} onChange={(e) => onSetStatus(e.target.checked)}/><span>Завершено</span>
    </div>
  )
}

export default TodoForm
