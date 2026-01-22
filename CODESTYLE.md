# Code Style

## React Components

### Function declarations, not arrow functions

```tsx
// ✓ Correct
export function AddSongForm({ collectionId }: IProps) {
  return <form>...</form>
}

// ✗ Incorrect
export const AddSongForm = ({ collectionId }: IProps) => {
  return <form>...</form>
}
```

### Event handlers

Use named `function handleXxx` when a handler performs 2+ actions. Arrow functions are fine for single-expression inline handlers.

```tsx
// ✓ Correct — 2+ actions, extract as named function
function handleClick() {
  setIsFavorite(!isFavorite)
  updateSong({ id: song.id, data: { isFavorite: !isFavorite } })
}

// ✓ Correct — single expression, inline is fine
<button onClick={() => setIsOpen(false)}>Close</button>

// ✗ Incorrect — 2+ actions inlined
<button onClick={() => { setIsFavorite(!isFavorite); updateSong(...) }}>
```

Wrap handlers in `useCallback` when passed as props or used in hook dependency arrays:

```tsx
const handleClose = useCallback(
  (event: MouseEvent | KeyboardEvent) => {
    event.stopPropagation()
    onClose?.()
  },
  [onClose]
)
```

### Exports

- **UI components** (features, entities, shared/ui, widgets): named exports
- **Page components**: default exports

```tsx
// features, entities, shared/ui, widgets
export function Button({ ... }: TProps) { }

// pages
function CollectionsPage() { }
export default CollectionsPage
```

### Reuse Shared Code

По возможности используйте shared-компоненты, утилиты и хуки из каталога `@shared`. Если существующему элементу не хватает нужной функциональности, предпочтительнее доработать или расширить его, чем создавать новый с нуля. Это обеспечивает единый стиль интерфейса, уменьшает дублирование и облегчает поддержку.


---

## Naming

| Target | Convention | Example |
|---|---|---|
| Component files | PascalCase | `AddSongForm.tsx` |
| Hook / util files | kebab-case | `use-keyboard.ts`, `sanitize.ts` |
| Selector files | `[name].selectors.ts` | `filterSongs.selectors.ts` |
| Slice files | `[name]Slice.ts` | `filterSongsSlice.ts` |
| Test files | `[Name].test.tsx` | `EditSongForm.test.tsx` |
| Style files | `[Name].scss` | `Button.scss` |
| React components | PascalCase | `EditSongForm`, `Button` |
| React hooks | `use` + PascalCase | `useKeyboard`, `useOutsideClick` |
| Event handlers | `handleXxx` | `handleSubmit`, `handleCancel` |
| Redux actions | camelCase verb | `setSearch`, `toggleEditMode` |
| Redux reducers | `[name]Reducer` | `filterSongsReducer` |

---

## TypeScript

### Interfaces vs Types

Use **interfaces** for props and domain objects; use **types** for unions, extensions of HTML attributes, and utility type aliases.

```tsx
// ✓ Interface for props and domain models
interface IProps {
  song: ISong
}

interface ISong {
  id: string
  title: string
  isFavorite: boolean
}

// ✓ Type for unions and HTML attribute extensions
type TProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'accent' | 'primary' | 'secondary'
  size?: 'small' | 'big'
}

// ✓ Discriminated union
type TextareaEditableProps = TextareaBaseProps & {
  readonly?: false
  onChange: (value: string) => void
}

type TextareaReadonlyProps = TextareaBaseProps & {
  readonly: true
  onChange?: never
}

type TextareaProps = TextareaEditableProps | TextareaReadonlyProps
```

### Naming prefixes

- Props interfaces: `IProps` (or `I[ComponentName]` when exported)
- Domain model interfaces: `I[Name]` — `ISong`, `ICollection`
- Type aliases for objects/unions: `T[Name]` — `TTonality`, `TProps`
- Redux state interfaces: `[name]State` — `FilterSongsState`, `editSongState`

### Where to define types

- **Props**: in the same file as the component, above it
- **Domain types**: `src/entities/[domain]/model/[domain]Type.ts`
- **Slice state**: in the slice file
- **Shared state type**: `AppState` from `@shared/config/redux`

---

## Imports

Group in this order, separated by blank lines when mixing significantly different layers:

1. External packages (`react`, `react-router-dom`, `react-i18next`, `clsx`)
2. Path aliases by FSD layer, top-down: `@app` → `@pages` → `@widgets` → `@features` → `@entities` → `@infra` → `@shared`
3. CSS / SCSS (`'./Button.scss'`)

```tsx
// ✓ Correct order
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ISongEditable, songApi, SongForm } from '@entities/song'
import { routes } from '@infra/router'
import './AddSongForm.scss'
```

Always use path aliases — never relative paths that cross layer boundaries.

---

## CSS / SCSS

### BEM with underscore modifiers

```scss
// Block
.button { }

// Element
.button__icon { }

// Modifier — leading underscore
.button._primary { }
.button._big { }
.button._only-icon { }
```

```tsx
// Modifiers applied via clsx
const classes = clsx(
  'button',
  variant && '_' + variant,
  size && '_' + size,
  { '_only-icon': !children && icon },
  className
)
```

### SCSS nesting

```scss
.input {
  &__wrapper {
    // ...

    &._focused { border: 1px solid var(--color-primary); }
    &._error   { border: 1px solid var(--color-negative); }
  }

  &__field {
    &::placeholder { color: var(--color-secondary); }
  }

  &__message {
    color: var(--color-negative);
  }
}
```

### CSS custom properties for theming

Never hard-code colors or shadows. Always use design-token variables:

```scss
// ✓ Correct
background-color: var(--bg-primary);
color: var(--color-primary);
box-shadow: var(--shadow-secondary);
font-size: var(--text-size-small);

// ✗ Incorrect
background-color: #ffffff;
color: #333333;
```

---

## Redux

### Slices

```tsx
interface FilterSongsState {
  search: string
  categories: ICategory[]
}

const initialState: FilterSongsState = {
  search: '',
  categories: CATEGORY_ITEM_LIST,
}

const filterSongsSlice = createSlice({
  name: 'filterSongs',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setSearch } = filterSongsSlice.actions
export const filterSongsReducer = filterSongsSlice.reducer
```

### Selectors

Place in `[name].selectors.ts` next to the slice. Always use `createSelector`. Start from a single base selector; compose from already-declared selectors.

```tsx
// filterSongs.selectors.ts
import { createSelector } from '@reduxjs/toolkit'
import type { AppState } from '@shared/config/redux'

export const selectFilterSongsState = (state: AppState) => state.filterSongs

export const selectCategories = createSelector(
  selectFilterSongsState,
  state => state.categories
)

export const selectActiveCategories = createSelector(
  selectCategories,
  categories => categories.filter(c => c.active)
)

export const selectSearch = createSelector(
  selectFilterSongsState,
  state => state.search
)
```

Antipatterns:
```tsx
// ✗ Accessing state fields directly instead of reusing selectors
export const selectActiveCategories = createSelector(
  (state: AppState) => state.filterSongs.categories, // duplicates base selector
  categories => categories.filter(c => c.active)
)

// ✗ Calling useAppSelector inside a selector file
export const selectSearch = () => useAppSelector(s => s.filterSongs.search)
```

### RTK Query

```tsx
// Query
const { data: songs = [], isLoading } =
  songApi.useGetSongsByCollectionIdQuery(collectionId)

// Mutation
const [addSong, { isLoading }] = songApi.useAddSongMutation()
const [updateSong] = songApi.useUpdateSongMutation()
```

---

## Barrel exports (`index.ts`)

Each FSD segment exports only its public API through `index.ts`. Do not import from internal paths across layers.

```tsx
// entities/song/index.ts
export { songApi } from './api/songApi'
export { SongContent } from './ui/song-content/SongContent'
export { SongForm } from './ui/song-form'
export type { ISong, ISongEditable } from './model/songType'
export { EMPTY_SONG_OBJ } from './config/consts'
```

```tsx
// ✓ Correct — import from the barrel
import { ISong, songApi, SongForm } from '@entities/song'

// ✗ Incorrect — import from internal path
import { ISong } from '@entities/song/model/songType'
```

---

## Tests

Use `renderWithProviders` and `setupStore` from `@shared/tests/test-utils`.

```tsx
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setupStore } from '@shared/tests/test-utils'
import { AddSongForm } from './AddSongForm'

const addSongMock = vi.fn()

vi.mock('@entities/song', async () => {
  const actual = await vi.importActual<typeof import('@entities/song')>('@entities/song')
  return {
    ...actual,
    songApi: {
      ...actual.songApi,
      useAddSongMutation: () => [addSongMock, { isLoading: false }],
    },
  }
})

describe('AddSongForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a song and navigates to the new song', async () => {
    addSongMock.mockResolvedValueOnce({ data: { id: '99' } })

    renderWithProviders(<AddSongForm collectionId='10' />)

    await userEvent.type(screen.getByPlaceholderText('Title'), 'New song')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(addSongMock).toHaveBeenCalledTimes(1)
  })
})
```

Mock RTK Query at the entity level (`vi.mock('@entities/song', ...)`), not at the API module level.
