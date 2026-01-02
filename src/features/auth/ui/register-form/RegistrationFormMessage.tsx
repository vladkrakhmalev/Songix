import { PRIVACY_POLICY_TEXT } from '@shared/config/privacy-policy'
import { Modal } from '@shared/ui/modal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function RegistrationFormMessage() {
  const { t } = useTranslation()

  const [isCopyrightOpen, setIsCopyrightOpen] = useState(false)

  return (
    <div className='auth-form__message'>
      {t('By clicking "Sign up", you accept the terms of the')}
      <button
        type='button'
        className='auth-form__link'
        onClick={() => setIsCopyrightOpen(true)}
      >
        {t('user agreement')}
      </button>

      {isCopyrightOpen && (
        <Modal title={t('Agreement')} onClose={() => setIsCopyrightOpen(false)}>
          <div
            className='auth-form__pre'
            dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY_TEXT }}
          />
        </Modal>
      )}
    </div>
  )
}
