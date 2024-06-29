import React, { useState } from 'react'
import TodoListItem from '../components/TodoListItem'
import { $todoListStore } from '../store/todoListStore'
import { useUnit } from 'effector-react'
import Modal from '../components/Modal'
import TodoForm from '../components/TodoForm'
import Button from '../components/UI/Button'
import todoItemStyle from '../assets/styles/TodoListItem.module.css'
import styles from '../assets/styles/TodoList.module.css'

const TodoList: React.FC = () => {

  const [todoList] = useUnit([
    $todoListStore
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const createTodo = () => {
    setShowModal(true);
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
            {
              todoList.todos.map(todo => (
                <TodoListItem 
                  key={todo.id} 
                  name={todo.name} 
                  description={todo.description} 
                  event={todo.event} 
                  status={todo.status} 
                />
                )
              )
            }
          </div>
        </div>

      </div>
      <Modal showModal={showModal}>
        <TodoForm setShowModal={setShowModal} />
      </Modal>
    </>
  )
}

export default TodoList