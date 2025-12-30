import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SongContent } from './SongContent'
import type { ISong } from '@entities/song'

describe('SongContent', () => {
  const song: ISong = {
    id: '1',
    collectionId: 1,
    title: 'Song title',
    text: 'Song text',
    isFavorite: false,
    tonalities: [],
  }

  it('renders song text with provided text size', () => {
    render(
      <MemoryRouter>
        <SongContent
          song={song}
          speed={{ value: 1, title: 'x1' }}
          textSize={{ value: 24, title: '24' }}
          configurate={<div>config</div>}
        />
      </MemoryRouter>
    )

    const text = screen.getByText('Song text')
    expect(text).toHaveStyle({ fontSize: '24px' })
    expect(screen.getByText('Song title')).toBeInTheDocument()
  })
})
