import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import '@shared/styles/index.scss'
import { store } from './store/store'
import { Suspense } from 'react'

export const App = () => {
  return (
    <div className='light-theme' id='main'>
      <Provider store={store}>
        {/* TODO: Сделать простую анимацию загрузки страниц */}
        <Suspense fallback=''>
          <AppRouter />
        </Suspense>
      </Provider>
    </div>
  )
}
