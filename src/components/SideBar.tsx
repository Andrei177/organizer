import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import home from '../assets/home.svg'
import calendar from '../assets/calendar.svg'
import todolist from '../assets/todolist.svg'
import user from '../assets/user.svg'
import Img from './UI/Img'
import styles from '../assets/styles/SideBar.module.css'

const SideBar: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    // const menuRef = useRef();

    // const onSetOffsetLeft = useUnit(setOffsetLeft)

    // useEffect(() => {
    //     onSetOffsetLeft(+menuRef.current.clientWidth)
    // }, [showMenu])

  return (
    <div className={showMenu? styles['sidebar'] + " " + styles['show-menu'] : styles['sidebar'] + " " + styles['hide-menu']} onClick={() => setShowMenu(!showMenu)} 
    //ref={menuRef}
    >
            <ul className={styles['sidebar-list']}>
                <li className={styles['sidebar-list__item']}>
                    <Img img={home}/>
                    <NavLink className={showMenu? styles['sidebar-list__item-link'] + " " + styles['show-item'] : styles['sidebar-list__item-link']} onClick={(e) => e.stopPropagation()} to={"/"}>
                        {showMenu && <> Главная</>}
                    </NavLink>
                </li>
                <li className={styles['sidebar-list__item']}>
                    <Img img={calendar}/>
                    <NavLink className={showMenu? styles['sidebar-list__item-link'] + " " + styles['show-item'] : styles['sidebar-list__item-link']} onClick={(e) => e.stopPropagation()} to={"/calendar"}>
                        {showMenu && <> Календарь</>}
                    </NavLink>
                </li>
                <li className={styles['sidebar-list__item']}>
                    <Img img={todolist}/>
                    <NavLink className={showMenu? styles['sidebar-list__item-link'] + " " + styles['show-item'] : styles['sidebar-list__item-link']} onClick={(e) => e.stopPropagation()} to={"/todolist"}>
                        {showMenu && <> Список дел</>}
                    </NavLink>
                </li>
            </ul>
            <ul className={styles['sidebar-list']}>
                <li className={styles['sidebar-list__item']}>
                    <Img img={user}/> 
                    <NavLink className={showMenu? styles['sidebar-list__item-link'] + " " + styles['show-item'] : styles['sidebar-list__item-link']} onClick={(e) => e.stopPropagation()} to={"/lk"}>
                        {showMenu && <> Личный кабинет</>}
                    </NavLink>
                </li>
            </ul>
    </div>
  )
}

export default SideBar