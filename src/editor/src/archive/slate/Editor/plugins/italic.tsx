import React from 'react'
import { Editor } from 'slate'
import { RenderMarkProps } from 'slate-react'
import isHotkey from 'is-hotkey'
import { Text } from '../../../../typography/index'

export function italicPlugin() {
  return {
    renderMark(props: RenderMarkProps, editor: Editor, next: () => void) {
      const { children, ...rest } = props
      if (props.mark.type === 'italic') {
        return <Text is="em">{children}</Text>
      }
      return next()
    },
    onKeyDown(event: React.KeyboardEvent, editor: Editor, next: () => void) {
      if (!isHotkey('mod+i', event)) return next()

      event.preventDefault()

      editor.toggleMark('italic')
    }
  }
}
