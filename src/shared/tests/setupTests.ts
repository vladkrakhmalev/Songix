import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Provide a root element for portals (e.g., Modal).
const mainRootId = 'main'
if (!document.getElementById(mainRootId)) {
  const main = document.createElement('div')
  main.setAttribute('id', mainRootId)
  document.body.appendChild(main)
}

// Mock matchMedia for components relying on system theme detection.
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-color-scheme: dark') ? false : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}

// Mock clipboard API used in sharing flows.
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn(),
    },
  })
}
