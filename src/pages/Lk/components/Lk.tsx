import {FC, useEffect, useState } from 'react'
import styles from '../../../assets/styles/Lk.module.css'
import Chart from '../../../components/Chart';
import { useUnit } from 'effector-react';
import { $todoListStore } from '../../TodoList/store/todoListStore';
import { $userStore, saveUserInfoServer, setAge, setDate, setName, setPatronymic, setSurname } from '../store/userStore';
import Button from '../../../UI/Button';
import { setNoticeMessage, setShowNotice } from '../../../modules/Notification/store/noticeStore';
import { getImage, handleImageChange } from '../helpers/fnsForDb';

const Lk: FC = () => {

  const [user, onSetSurname, onSetName, onSetPatronymic, onSetDate, onSetAge, onSaveUserInfoServer] =
    useUnit([$userStore, setSurname, setName, setPatronymic, setDate, setAge, saveUserInfoServer])
  const [todoList] = useUnit([$todoListStore]);

  const [onSetShowNotice, onSetNoticeMessage] = useUnit([setShowNotice, setNoticeMessage])

  const [image, setImage] = useState<string | ArrayBuffer | null>('');

  useEffect(() => {
    getImage().then(savedImage => {
      if (savedImage) {
        setImage(savedImage);
      }
    });
  }, []);

  const saveInfo = () => {
    onSaveUserInfoServer({ ...user })
      .then(() => onSetNoticeMessage("Ваши личные данные сохранены"))
      .catch(() => onSetNoticeMessage("Произошла ошибка при сохранении личных данных"))
      .finally(() => onSetShowNotice(true))
  }

  const completedTodo = todoList.todos.filter(todo => todo.status === true).length;

  return (
    <div className={styles['lk']}>
      <h1 className={styles['lk-title']}>Личный кабинет</h1>
      <div className={styles['user']}>
        <div className={styles['user-img']}>
          {
            image
              ? <img className={styles['user-img__image']} src={String(image)}></img>
              : <div className={styles['user-not-avatar']}></div>
          }
        </div>
        <div className={styles['user-info']}>
          <h3 className={styles['user-info-title']}>Личная информация</h3>
          <div className={styles['user-info-fields']}>
            <input type="text" placeholder='Фамилия' value={user.surname} onChange={e => onSetSurname(e.target.value)} />
            <input type="text" placeholder='Имя' value={user.name} onChange={e => onSetName(e.target.value)} />
            <input type="text" placeholder='Отчество' value={user.patronymic} onChange={e => onSetPatronymic(e.target.value)} />
            <input type="date" value={user.birthday} onChange={e => onSetDate(String(e.target.value))} />
            <input type="number" placeholder='Возраст' value={user.age} onChange={e => onSetAge(e.target.value)} />
            <Button disabled={!user.name} onClick={saveInfo}>Сохранить</Button>
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
        onChange={(e) => handleImageChange(e, setImage)}
      />
    </div>
  )
}

export default Lk