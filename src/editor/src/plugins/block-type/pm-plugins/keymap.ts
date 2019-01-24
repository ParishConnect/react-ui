import { chainCommands } from 'prosemirror-commands'
import { undoInputRule } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { redo, undo } from 'prosemirror-history'
import { Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import * as keymaps from '../../../keymaps'
import * as commands from '../../../commands'

import * as blockTypes from '../types'
import {
  insertBlockType,
  cleanUpAtTheStartOfDocument
} from '../../block-type/commands'

const analyticsEventName = (blockTypeName: string, eventSource: string) =>
  `atlassian.editor.format.${blockTypeName}.${eventSource}`
const tryUndoInputRuleElseUndoHistory = chainCommands(undoInputRule, undo)

export default function keymapPlugin(schema: Schema): Plugin {
  const list = {}

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!,
    commands.insertNewLine(),
    list
  )
  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common!,
    commands.createNewParagraphAbove,
    list
  )
  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    commands.createNewParagraphBelow,
    list
  )
  keymaps.bindKeymapWithCommand(
    keymaps.findKeyMapForBrowser(keymaps.redo)!,
    redo,
    list
  )
  keymaps.bindKeymapWithCommand(
    keymaps.undo.common!,
    tryUndoInputRuleElseUndoHistory,
    list
  )
  keymaps.bindKeymapWithCommand(
    keymaps.findKeyMapForBrowser(keymaps.redoBarred)!,
    commands.preventDefault(),
    list
  )

  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common!,
    cleanUpAtTheStartOfDocument,
    list
  )
  ;[
    blockTypes.NORMAL_TEXT,
    blockTypes.HEADING_1,
    blockTypes.HEADING_2,
    blockTypes.HEADING_3,
    blockTypes.HEADING_4,
    blockTypes.HEADING_5,
    blockTypes.HEADING_6,
    blockTypes.BLOCK_QUOTE
  ].forEach(blockType => {
    if (schema.nodes[blockType.nodeName]) {
      const shortcut = keymaps.findShortcutByDescription(
        blockType.title.defaultMessage
      )
      if (shortcut) {
        const eventName = analyticsEventName(blockType.name, 'keyboard')
        keymaps.bindKeymapWithCommand(
          shortcut,
          insertBlockType(blockType.name),
          list
        )
      }
    }
  })

  return keymap(list)
}
