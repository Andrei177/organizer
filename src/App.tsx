import './App.css'
import AppRouter from './router/AppRouter';
import TopPanel from './components/TopPanel';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="app">
      <SideBar/>
      <div className='panel-main'>
        <TopPanel/>
        <AppRouter/>
      </div>
    </div>
  )
}

export default App
