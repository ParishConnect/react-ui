import React from 'react'
import { Value } from 'slate'
import { isKeyHotkey } from 'is-hotkey'
import { Code, Strong } from '../../typography'

export const RULES = [
  {
    serialize: (_, children) => {
      if (_.object === 'mark') {
        switch (_.type) {
          case 'bold':
            return <Strong is="strong">{children}</Strong>
          case 'code':
            return <Code is="code">{children}</Code>
          case 'italic':
            return <em>{children}</em>
          case 'strikethrough':
            return <strike>{children}</strike>
          case 'underline':
            return <u>{children}</u>
          default:
            return <span>{children}</span>
        }
      }
      if (_.object === 'block') {
        return <p>{children}</p>
      }
      if (_.object === 'string') {
        return children
      }
    }
  }
]

export const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: ''
      }
    ]
  }
})

export const isBoldHotkey = isKeyHotkey('mod+b')
export const isItalicHotkey = isKeyHotkey('mod+i')
export const isUnderlinedHotkey = isKeyHotkey('mod+u')

export const getBlockquoteStyle = theme => {
  return {
    borderTop: `2px solid ${theme.getThemeColor(theme)}`,
    borderBottom: `2px solid ${theme.getThemeColor(theme)}`,
    padding: 25,
    marginY: 25,
    marginX: 75
  }
}
