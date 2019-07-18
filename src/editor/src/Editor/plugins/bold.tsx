import React from 'react'
import { Editor } from 'slate'
import { RenderMarkProps } from 'slate-react'
import isHotkey from 'is-hotkey'
import { Strong } from '../../../../typography/index'

export function boldPlugin() {
  return {
    renderMark(props: RenderMarkProps, editor: Editor, next: () => void) {
      const { children, ...rest } = props
      if (props.mark.type === 'bold') {
        return <Strong>{children}</Strong>
      }
      return next()
    },
    onKeyDown(event: React.KeyboardEvent, editor: Editor, next: () => void) {
      if (!isHotkey('mod+b', event)) return next()

      event.preventDefault()

      editor.toggleMark('bold')
    }
  }
}
