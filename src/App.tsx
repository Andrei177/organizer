import './App.css'
import AppRouter from './router/AppRouter';
import TopPanel from './components/TopPanel';
import SideBar from './components/SideBar';
import Notification from './modules/Notification/components/Notification';
import { useUnit } from 'effector-react';
import { fetchEvents } from './pages/Calendar/store/calendarStore';
import { useEffect } from 'react';
import { fetchTodos } from './pages/TodoList/store/todoListStore';
import { fetchUserInfo } from './pages/Lk/store/userStore';

function App() {

  const [onFetchEvents, onFetchTodos, onFetchUserInfo] = useUnit([fetchEvents, fetchTodos, fetchUserInfo]);

  useEffect(() => {
    onFetchEvents();
    onFetchTodos();
    onFetchUserInfo();
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
