import { memoize, Attrs } from '@remirror/core'
import { MouseEventHandler } from 'react'

export const runAction = memoize(
  (
    method: (attrs?: Attrs) => void,
    attrs?: Attrs
  ): MouseEventHandler<HTMLElement> => e => {
    e.preventDefault()
    method(attrs)
  }
)
