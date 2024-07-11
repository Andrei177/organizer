import { FC, useRef } from 'react'
import styles from '../../../assets/styles/Home.module.css'
import Widget from './Widget'
import CalendarMini from 'react-calendar'
import { $homeStore, setPositionCalendar, setPositionTodoList } from '../store/homeStore'
import { $calendarStore } from '../../Calendar/store/calendarStore'
import { useUnit } from 'effector-react'
import { renderTile } from '../../Calendar/helpers/renderTile'
import todoItemStyle from '../../../assets/styles/TodoListItem.module.css'
import todoListStyle from '../../../assets/styles/TodoList.module.css'
import TodoListItem from '../../TodoList/components/TodoListItem'
import { $todoListStore } from '../../TodoList/store/todoListStore'
import 'react-calendar/dist/Calendar.css';

const Home: FC = () => {

  const [homeStore, onSetPositionCalendar, onSetPositionTodoList] = useUnit([$homeStore, setPositionCalendar, setPositionTodoList])
  const calendar = useUnit($calendarStore)
  const todoList = useUnit($todoListStore);

  const containerRef = useRef(null);

  return (
    <div 
    ref={containerRef}
    className={styles['home']}
    >
      <h1 className={styles['home-title']}>Главная</h1>
      <Widget title="Календарь" position={homeStore.positionCalendar} setPosition={onSetPositionCalendar} clickRoute="/calendar" containerRef={containerRef}>
        <CalendarMini
          tileContent={(tile) => renderTile(tile.date, tile.view, calendar.events, true)}
        />
      </Widget>
      <Widget title="Список дел" position={homeStore.positionTodoList} setPosition={onSetPositionTodoList} clickRoute="/todolist" containerRef={containerRef}>
        <div className={todoListStyle['todolist-table'] + " " + todoListStyle['mini']}>
          <div className={todoItemStyle['todolist-item']}>Наименование</div>
          <div className={todoItemStyle['todolist-item']}>Статус</div>
          {
            todoList.todos.map(todo => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                mini={true}
              />)
            )
          }
        </div>
      </Widget>
    </div>
  )
}

export default Home