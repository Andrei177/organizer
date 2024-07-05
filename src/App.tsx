import './App.css'
import AppRouter from './router/AppRouter';
import TopPanel from './components/TopPanel';
import SideBar from './components/SideBar';
import Notification from './modules/Notification/components/Notification';

function App() {
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
