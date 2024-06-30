import React from 'react'
import styles from '../../assets/styles/Button.module.css'

interface IPropsButton{
    disabled?: boolean,
    onClick?: () => void,
    children: React.ReactNode
}

const Button: React.FC<IPropsButton> = (props) => {
  return (
    <button className={styles.customBtn} style={{backgroundColor: props.disabled ? "#70e589" : "#23be44" }} {...props}>
      {props.children}
    </button>
  )
}

export default Button
