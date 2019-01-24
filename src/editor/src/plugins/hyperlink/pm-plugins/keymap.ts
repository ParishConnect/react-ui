import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'
import { Plugin, EditorState } from 'prosemirror-state'
import * as keymaps from '../../../keymaps'

import { EditorProps } from '../../../types/editor-props'
import { Match, getLinkMatch } from '../utils'
import { HyperlinkState, stateKey } from '../pm-plugins/main'
import { showLinkToolbar, hideLinkToolbar } from '../commands'
import { queueCards } from '../../card/pm-plugins/actions'
import { Command } from '../../../types'

export function createKeymapPlugin(
  schema: Schema,
  props: EditorProps
): Plugin | undefined {
  const list = {}

  if (props.appearance !== 'message') {
    keymaps.bindKeymapWithCommand(
      keymaps.addLink.common!,
      showLinkToolbar(),
      list
    )
  }

  keymaps.bindKeymapWithCommand(
    keymaps.enter.common!,
    mayConvertLastWordToHyperlink,
    list
  )

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!,
    mayConvertLastWordToHyperlink,
    list
  )

  keymaps.bindKeymapWithCommand(
    keymaps.escape.common!,
    (state: EditorState, dispatch, view) => {
      const hyperlinkPlugin = stateKey.getState(state) as HyperlinkState
      if (hyperlinkPlugin.activeLinkMark) {
        hideLinkToolbar()(state, dispatch)
        if (view) {
          view.focus()
        }
        return false
      }
      return false
    },
    list
  )

  return keymap(list)
}

const mayConvertLastWordToHyperlink: Command = (state, dispatch) => {
  const nodeBefore = state.selection.$from.nodeBefore
  if (!nodeBefore || !nodeBefore.isText) {
    return false
  }

  const words = nodeBefore.text!.split(' ')
  const lastWord = words[words.length - 1]
  const match: Match | null = getLinkMatch(lastWord)

  if (match) {
    const hyperlinkedText = match.raw
    const start = state.selection.$from.pos - hyperlinkedText.length
    const end = state.selection.$from.pos

    if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
      return false
    }

    const url = match.url
    const markType = state.schema.mark('link', { href: url })

    const tr = queueCards([
      {
        url,
        pos: start,
        appearance: 'inline'
      }
    ])(state.tr.addMark(start, end, markType))

    if (dispatch) {
      dispatch(tr)
    }
  }
  return false
}

export default createKeymapPlugin