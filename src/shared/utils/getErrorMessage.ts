import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Resolves a user-facing message for RTK Query errors, using provided status-specific
 * overrides and fallbacks for known server/client cases.
 *
 * @param errorMessages Map of HTTP status codes to custom messages.
 * @param error RTK Query error payload to extract the message from.
 * @returns Matched custom message, a server/client fallback, or an empty string when no error.
 */
export function getErrorMessage(
  messagesByStatus: Record<number, string>,
  error?: FetchBaseQueryError | SerializedError
): string {
  if (!error) return ''

  if ('status' in error) {
    if (typeof error.status === 'number') {
      if (typeof messagesByStatus[error.status] === 'string') {
        return messagesByStatus[error.status]
      }

      switch (error.status) {
        case 500:
          return 'An error occurred on the server side'
      }
    }
  }

  return 'An error occurred on the client side'
}
