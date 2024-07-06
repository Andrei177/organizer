import './App.css'
import AppRouter from './router/AppRouter';
import TopPanel from './components/TopPanel';
import SideBar from './components/SideBar';
import Notification from './modules/Notification/components/Notification';
import { useUnit } from 'effector-react';
import { fetchEvents } from './pages/Calendar/store/calendarStore';
import { useEffect } from 'react';
import { fetchTodos } from './pages/TodoList/store/todoListStore';

function App() {

  const [onFetchEvents, onFetchTodos] = useUnit([fetchEvents, fetchTodos]);

  useEffect(() => {
    onFetchEvents();
    onFetchTodos();
  }, [])

  return (
    <div className="app">
      <SideBar/>
      <div className='panel-main'>
        <TopPanel/>
        <AppRouter/>
        <Notification/>
      </div>
    </div>
  )
}

export default App
