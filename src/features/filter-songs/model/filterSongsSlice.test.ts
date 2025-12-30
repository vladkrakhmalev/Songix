import { describe, expect, it } from 'vitest'
import {
  filterSongsReducer,
  setActiveCategory,
  setDisactiveCategory,
  setSearch,
} from './filterSongsSlice'
import { CATEGORY_ITEM_LIST } from '@entities/category'

describe('filterSongsSlice', () => {
  it('initialises with all categories inactive and empty search', () => {
    const state = filterSongsReducer(undefined, { type: 'init' })
    expect(state.search).toBe('')
    expect(state.categories).toHaveLength(CATEGORY_ITEM_LIST.length)
    expect(state.categories.every(category => !category.active)).toBe(true)
  })

  it('updates search value', () => {
    const state = filterSongsReducer(undefined, setSearch('hello'))
    expect(state.search).toBe('hello')
  })

  it('activates and deactivates categories by index', () => {
    let state = filterSongsReducer(undefined, setActiveCategory(1))
    expect(state.categories[1].active).toBe(true)

    state = filterSongsReducer(state, setDisactiveCategory(1))
    expect(state.categories[1].active).toBe(false)
  })
})
