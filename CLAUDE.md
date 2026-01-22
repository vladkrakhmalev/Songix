# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (with --host)
npm run build        # Build for production
npm run lint         # TypeScript check + ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run server       # Start json-server for local development
npm run test         # Run all tests once
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with Vitest UI
```

To run a single test file:
```bash
npx vitest run src/features/edit-song/ui/EditSongForm.test.tsx
```

## Architecture

The project follows **Feature-Sliced Design (FSD)**. Import direction: `app → pages → widgets → features → entities → infra → shared`. Never import upward.

**Path aliases** (configured in `vite.config.ts`):
- `@app` → `src/app`
- `@pages` → `src/pages`
- `@widgets` → `src/widgets`
- `@features` → `src/features`
- `@entities` → `src/entities`
- `@infra` → `src/infra`
- `@shared` → `src/shared`

### Layers

- **`src/app`** — App bootstrap: providers, Redux store, router (`AppRouter.tsx`)
- **`src/pages`** — Page-level components. Two layout groups: `AuthLayout` (login, registration) and `MainLayout` (all authenticated pages)
- **`src/widgets`** — `collection-list`, `configurate-list`, `navigation`, `song-list`
- **`src/features`** — User interactions: `add-collection`, `add-song`, `auth`, `configurate-songs`, `delete-collection`, `edit-song`, `filter-songs`, `like-song`, `rename-collection`, `reset-password`
- **`src/entities`** — Domain: `song`, `collection`, `auth` — each has `api/`, `model/`, `ui/`, `index.ts`
- **`src/infra`** — Infrastructure: `dom`, `router`, `theme`, `translations`
- **`src/shared`** — `api/`, `config/`, `hooks/`, `styles/`, `tests/`, `types/`, `ui/`, `utils/`

### State Management

Redux Toolkit with RTK Query. The store (`src/app/store/store.ts`) contains:
- **RTK Query APIs** (server state): `collectionApi`, `songApi`, `authApi`
- **Redux slices** (client state): `filterSongs`, `configurateSongs`, `editSong`

Use `useAppDispatch` and `useAppSelector` from `@shared/config/redux`. The type `AppState` is the canonical state type.

### API & Auth

- Base URL: `VITE_API_URL` env var or `https://songix.ru/api/`
- Cookie-based auth with automatic token refresh on 401 (`src/shared/api/baseQuery.ts`)
- API responses are auto-converted from `snake_case` to `camelCase`; requests are sent as `snake_case` (via `convertKeys` from `@shared/utils/convert-case`)
- Local dev: run `npm run server` to start json-server; Vite proxies `/api` to `http://127.0.0.1:8000`

### Translations

- Locale files: `public/translations/{lang}/{ns}.yaml` (langs: `ru`, `en`; namespaces: `default`, `auth`)
- i18next config: `src/infra/translations/`
- All user-visible strings must be translated. Keys must match the English value and use the same case (`Sign in: Sign in`). Keep YAML flat — no nested objects.

## Code Style

See [CODESTYLE.md](./CODESTYLE.md) for full code style rules with examples and antipatterns.

## Testing

Tests use Vitest + jsdom + Testing Library. Test setup: `src/shared/tests/setupTests.ts`.

Use `renderWithProviders` and `setupStore` from `@shared/tests/test-utils` — these wrap components with all required providers (Redux, Router, ThemeProvider, i18next).

```ts
import { renderWithProviders, setupStore } from '@shared/tests/test-utils'
```

Mock RTK Query hooks with `vi.mock('@entities/song', async () => { ... })`.
