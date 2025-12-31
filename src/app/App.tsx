import { AppRouter } from './routers/AppRouter'
import '@shared/styles/index.scss'
import { ThemeProvider } from '@infra/theme'
import { TranslationProvider } from '@infra/translations'
import { LoadingProvider } from './providers/loading'
import { StoreProvider } from './store'

export function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <StoreProvider>
          <TranslationProvider>
            <AppRouter />
          </TranslationProvider>
        </StoreProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}
