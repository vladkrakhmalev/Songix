import './SettingsPage.scss'
import { LogoutButton } from '@features/auth'
import { ThemeSwitcher } from '@infra/theme'

function SettingsPage() {
  return (
    <div className='settings-page'>
      <h1>Настройки</h1>

      <div className='settings-page__item'>
        Тема
        <ThemeSwitcher />
      </div>

      <LogoutButton />
    </div>
  )
}

export default SettingsPage
