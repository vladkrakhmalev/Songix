import { Select } from '@shared/ui/select'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../config/translations.constants'
import { useCurrentLanguage } from '../model/useCurrentLanguage'

export function LanguageSelect() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useCurrentLanguage()

  const options = Object.values(LANGUAGES).map(option => ({
    value: option.code,
    label: t(option.labelKey),
  }))

  return (
    <Select
      options={options}
      value={language}
      optionsTitle={t('Language')}
      onChange={changeLanguage}
    />
  )
}
