import './SettingsPage.scss'
import { LogoutButton } from '@features/auth'

const SettingsPage = () => {
  return (
    <div className='settings-page'>
      <h1>Настройки</h1>

      <div className='settings-page__item'>
        Тема
        {/* TODO Вставить смены темы */}
      </div>

      <LogoutButton />
    </div>
  )
}

export default SettingsPage
