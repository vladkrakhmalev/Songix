import { useEffect, useMemo, useState } from 'react'
import { getErrorMessage } from '@shared/utils/getErrorMessage'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

type ErrorsMap = Record<number, string>

type TProps<T> = {
  initialValues: T
  isLoading: boolean
  isSuccess: boolean
  serverError: FetchBaseQueryError | SerializedError | undefined
  errorsMap: ErrorsMap
  validate?: (form: T) => string | undefined
  submit: (form: T) => void | Promise<void>
  onSuccess?: () => void
}

export function useAuthForm<T extends Record<string, string>>({
  initialValues,
  isLoading,
  isSuccess,
  serverError,
  errorsMap,
  validate,
  submit,
  onSuccess,
}: TProps<T>) {
  const [form, setForm] = useState<T>(initialValues)
  const [serverMessage, setServerMessage] = useState<string | undefined>()

  const validationMessage = useMemo(
    () => (validate ? validate(form) : undefined),
    [form, validate]
  )

  const errorMessage = serverMessage || validationMessage
  const isSubmitDisabled = isLoading || !!errorMessage

  function change<K extends keyof T>(field: K, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (serverMessage) setServerMessage(undefined)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (validationMessage) return
    submit(form)
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.()
      setForm(initialValues)
    }
  }, [isSuccess, initialValues, onSuccess])

  useEffect(() => {
    const msg = getErrorMessage(errorsMap, serverError)
    setServerMessage(msg)
  }, [serverError, errorsMap])

  return {
    form,
    change,
    handleSubmit,
    errorMessage,
    validationMessage,
    serverMessage,
    isLoading,
    isSubmitDisabled,
  }
}
