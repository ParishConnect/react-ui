import { Schema } from 'prosemirror-model'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'
import * as keymaps from '../../../keymaps'
import { clearFormatting } from '../commands/clear-formatting'

export function keymapPlugin(schema: Schema): Plugin {
  const list = {}
  keymaps.bindKeymapWithCommand(
    keymaps.clearFormatting.common!,
    clearFormatting(),
    list
  )

  return keymap(list)
}

export default keymapPlugin
