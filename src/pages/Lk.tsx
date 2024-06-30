import React from 'react'
import styles from '../assets/styles/Lk.module.css'
import Chart from '../components/Chart';
import { useUnit } from 'effector-react';
import { $todoListStore } from '../store/todoListStore';
import { $userStore, setAvatar } from '../store/userStore';

const Lk: React.FC = () => {

  const [user, onSetAvatar] = useUnit([$userStore, setAvatar])
  const [todoList] = useUnit([$todoListStore]);

  const getAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSetAvatar(e.target.files[0]);
    }
  }

  const completedTodo = todoList.todos.filter(todo => todo.status === true).length;

  return (
    <div className={styles['lk']}>
      <h1 className={styles['lk-title']}>Личный кабинет</h1>
      <div className={styles['user']}>
        <div className={styles['user-img']}>
          {
            user.avatar
              ? <img className={styles['user-img__image']} src={URL.createObjectURL(user.avatar)}></img>
              : <div className={styles['user-not-avatar']}></div>
          }
        </div>
        <div className={styles['user-info']}>
          <h3 className={styles['user-info-title']}>Личная информация</h3>
          <div className={styles['user-info-fields']}>
            <input type="text" placeholder='Фамилия' />
            <input type="text" placeholder='Имя' />
            <input type="text" placeholder='Отчество' />
            <input type="date" />
            <input type="number" placeholder='Возраст'/>
          </div>
        </div>
        <div className={styles['user-chart']}>
          <h3 className={styles['user-chart-title']}>
            График дел
          </h3>
          <Chart completed={completedTodo} notCompleted={todoList.todos.length - completedTodo} />
        </div>
      </div>
      <input 
        className={styles['user-img__inp']} 
        type="file" 
        accept="image/png, image/gif, image/jpeg" 
        onChange={getAvatar} 
      />
    </div>
  )
}

export default Lk