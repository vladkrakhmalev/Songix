import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Textarea } from './Textarea'

vi.mock('react-contenteditable', () => ({
  default: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid='contenteditable' {...props} />
  ),
}))

describe('Textarea', () => {
  it('shows placeholder when value is empty', () => {
    render(<Textarea value='' placeholder='Текст' onChange={vi.fn()} />)
    expect(screen.getByText('Текст')).toBeInTheDocument()
  })

  it('hides placeholder when value provided', () => {
    render(
      <Textarea
        value='<div>content</div>'
        placeholder='Текст'
        onChange={vi.fn()}
      />
    )
    expect(screen.queryByText('Текст')).toBeNull()
  })

  it('sanitizes html before calling onChange', () => {
    const onChange = vi.fn()
    render(<Textarea value='' placeholder='Текст' onChange={onChange} />)

    const field = screen.getByTestId('contenteditable')
    fireEvent.change(field, {
      target: {
        value: "<script>alert('x')</script><div>safe</div>",
      },
    })

    expect(onChange).toHaveBeenCalledWith('<div>safe</div>')
  })
})
