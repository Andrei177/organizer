import React from 'react'
import styles from '../assets/styles/Lk.module.css'
import Chart from '../components/Chart';
import { useUnit } from 'effector-react';
import { $todoListStore } from '../store/todoListStore';
import { $userStore, setAge, setAvatar, setDate, setName, setPatronymic, setSurname } from '../store/userStore';

const Lk: React.FC = () => {

  const [user, onSetAvatar, onSetSurname, onSetName, onSetPatronymic, onSetDate, onSetAge] = 
    useUnit([$userStore, setAvatar, setSurname, setName, setPatronymic, setDate, setAge])
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
            <input type="text" placeholder='Фамилия' value={user.surname} onChange={e => onSetSurname(e.target.value)}/>
            <input type="text" placeholder='Имя' value={user.name} onChange={e => onSetName(e.target.value)}/>
            <input type="text" placeholder='Отчество' value={user.patronymic} onChange={e => onSetPatronymic(e.target.value)}/>
            <input type="date" value={user.birthday} onChange={e => {
              onSetDate(String(e.target.value))
              console.log(user.birthday);
              }}/>
            <input type="number" placeholder='Возраст' value={user.age} onChange={e => onSetAge(e.target.value)}/>
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