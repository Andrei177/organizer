import { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import Spinner from '../UI/Spinner'

const AppRouter: FC = () => {
  return (
    <div className='app-router'>
      <Suspense fallback={<Spinner/>}>
        <Routes>
          {routes.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
        </Routes>
      </Suspense>
    </div>
  )
}

export default AppRouter