import { FC, ReactNode } from 'react'
import styles from '../../assets/styles/Modal.module.css'
import { closeModal } from '../Modal/helpers/closeModal';

interface IPropsModal {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  setIsEditing?: (bool: boolean) => void;
  setEmptyForm?: () => void;
  setIsReading?: (bool: boolean) => void;
}

const Modal: FC<IPropsModal> = ({ children, showModal, setShowModal, setIsEditing, setEmptyForm, setIsReading }) => {
  return (
    <div className={showModal ? styles['modal'] + " " + styles['show'] : styles['modal'] + " " + styles['hide']}>
      <div className={showModal ? styles['modal-content'] : styles['modal-content'] + " " + styles['hide-content']}>
        <h4
          style={{ textAlign: "end", cursor: "pointer" }}
          onClick={() => {
            closeModal(setShowModal, setIsEditing, setEmptyForm)
            if (setIsReading) {
              setTimeout(() => {
                setIsReading(false)
              }, 350)
            }
          }}>X</h4>
        {children}
      </div>
    </div>
  )
}

export default Modal