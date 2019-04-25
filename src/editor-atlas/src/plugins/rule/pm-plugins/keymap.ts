import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import * as keymaps from '../../../keymaps'
import * as commands from '../../../commands'

export function keymapPlugin(schema: Schema): Plugin {
  const list = {}

  keymaps.bindKeymapWithCommand(
    keymaps.insertRule.common!,
    commands.insertRule(),
    list
  )

  keymaps.bindKeymapWithCommand(
    keymaps.escape.common!,
    (state: any, dispatch) => {
      return true
    },
    list
  )

  return keymap(list)
}

export default keymapPlugin
