import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import '@shared/styles/index.scss'
import { store } from './store/store'
import { ThemeProvider } from '@infra/theme'
import { TranslationProvider } from '@infra/translations'

export function App() {
  return (
    <ThemeProvider>
      <div id='main'>
        <Provider store={store}>
          <TranslationProvider>
            <AppRouter />
          </TranslationProvider>
        </Provider>
      </div>
    </ThemeProvider>
  )
}
