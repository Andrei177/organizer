import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'

const AppRouter: FC = () => {
  return (
    <div className='app-router'>
      <Routes>
          {routes.map((route) => <Route key={route.path} path={route.path} element={route.element}/>)}
      </Routes>
    </div>
  )
}

export default AppRouter