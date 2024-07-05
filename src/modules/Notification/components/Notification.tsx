import { FC } from 'react'
import styles from '../../../assets/styles/Notification.module.css'
import { useUnit } from 'effector-react'
import { $noticeStore, setShowNotice } from '../store/noticeStore'

const Notification: FC = () => {

  const [noticeStore, onSetShowNotice] = useUnit([$noticeStore, setShowNotice]);

  return (
    <div className={noticeStore.showNotice ? styles['notification'] + " " + styles['show'] : styles['notification'] + " " + styles['hide']}>
      <h4 className={styles['close-btn']} onClick={() => onSetShowNotice(false)}>x</h4>
      {noticeStore.noticeMessage}
    </div>
  )
}

export default Notification
