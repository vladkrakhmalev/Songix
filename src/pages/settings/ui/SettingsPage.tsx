import './SettingsPage.scss'
import { LogoutButton } from '@features/auth'
import { ThemeSwitcher } from '@infra/theme'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '@infra/translations'

function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div className='settings-page'>
      <h1>{t('Settings')}</h1>

      <div className='settings-page__item'>
        {t('Theme')}
        <ThemeSwitcher />
      </div>

      <div className='settings-page__item'>
        {t('Language')}
        <LanguageSelect />
      </div>

      <LogoutButton />
    </div>
  )
}

export default SettingsPage
