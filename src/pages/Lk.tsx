import React, { useState } from 'react'
import styles from '../assets/styles/Lk.module.css'

const Lk: React.FC = () => {

  const [avatar, setAvatar] = useState<File | null>();

  const getAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  }

  return (
    <div className={styles['lk']}>
      <div className={styles['user']}>
        <div className={styles['user-img']}>
          {
            avatar
            ?<img className={styles['user-img__image']} src={URL.createObjectURL(avatar)}></img>
            :<div className={styles['user-not-avatar']}></div>
          }
        </div>
        <div className={styles['user-info']}>
          <input type="text" placeholder='Фамилия'/>
          <input type="text" placeholder='Имя'/>
          <input type="text" placeholder='Отчество'/>
          <input type="date" />
          <input type="number" />
        </div>
      </div>
      <input className={styles['user-img__inp']} type="file" accept="image/png, image/gif, image/jpeg" onChange={getAvatar}/>
      <div className={styles['chart']}>
       График дел
      </div>
    </div>
  )
}

export default Lk