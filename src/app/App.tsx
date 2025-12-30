import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import '@shared/styles/index.scss'
import { store } from './store/store'
import { ThemeProvider } from '@infra/theme'
import { LoadingProvider } from './providers/loading'

export function App() {
  return (
    <ThemeProvider>
      <div id='main'>
        <Provider store={store}>
          <LoadingProvider>
            <AppRouter />
          </LoadingProvider>
        </Provider>
      </div>
    </ThemeProvider>
  )
}
