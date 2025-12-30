import { describe, expect, it } from 'vitest'
import {
  configurateSongsReducer,
  setSpeed,
  setTonality,
  setTextSize,
} from './configurateSongs'
import { SPEED_ARRAY, TEXT_SIZE_ARRAY, TONALITY_ARRAY } from '../config/consts'

describe('configurateSongsSlice', () => {
  it('has expected defaults', () => {
    const state = configurateSongsReducer(undefined, { type: 'init' })
    expect(state.speed).toEqual(SPEED_ARRAY[0])
    expect(state.tonality).toEqual(TONALITY_ARRAY[0])
    expect(state.textSize).toEqual(TEXT_SIZE_ARRAY[6])
  })

  it('updates speed, tonality and text size', () => {
    const nextSpeed = SPEED_ARRAY[2]
    const nextTonality = TONALITY_ARRAY[4]
    const nextSize = TEXT_SIZE_ARRAY[1]

    let state = configurateSongsReducer(undefined, setSpeed(nextSpeed))
    state = configurateSongsReducer(state, setTonality(nextTonality))
    state = configurateSongsReducer(state, setTextSize(nextSize))

    expect(state.speed).toEqual(nextSpeed)
    expect(state.tonality).toEqual(nextTonality)
    expect(state.textSize).toEqual(nextSize)
  })
})
