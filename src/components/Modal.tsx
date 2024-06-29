import React from 'react'
import styles from '../assets/styles/Modal.module.css'

interface IPropsModal{
    children: React.ReactNode;
    showModal: boolean;
}

const Modal: React.FC<IPropsModal> = ({children, showModal}) => {
  return (
    <div className={showModal ? styles['modal'] + " " + styles['show'] : styles['modal'] + " " + styles['hide']}>
      <div className={showModal ? styles['modal-content'] : styles['modal-content'] + " " + styles['hide-content']}>
        {children}
      </div>
    </div>
  )
}

export default Modal
