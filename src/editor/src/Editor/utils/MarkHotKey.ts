import { Editor } from 'slate-react'

type MarkHotKeyOptions = {
  type: string
  key: string
}

export function MarkHotKey(options: MarkHotKeyOptions) {
  const { type, key } = options

  return {
    onKeyDown(event: React.KeyboardEvent, editor: Editor, next: () => void) {
      if (!event.ctrlKey || event.key != key) return next()

      event.preventDefault()

      editor.toggleMark(type)
    }
  }
}
