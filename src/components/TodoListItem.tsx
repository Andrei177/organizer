import React from 'react'
import styles from '../assets/styles/TodoListItem.module.css'

interface IPropsTodoListItem{
    name: string;
    description: string;
    event: string;
    status: boolean
}

const TodoListItem: React.FC<IPropsTodoListItem> = ({name, description, event, status}) => {
  return (
    <>
      <div className={styles['todolist-item']}>{name}</div>
      <div className={styles['todolist-item']}>{description}</div>
      <div className={styles['todolist-item']}>{event}</div>
      <div className={styles['todolist-item']}>{status ? <>V</> : <>X</>}</div>
    </>
  )
}

export default TodoListItem
