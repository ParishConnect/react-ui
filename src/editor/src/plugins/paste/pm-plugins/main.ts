import * as MarkdownIt from 'markdown-it'
// @ts-ignore
import { handlePaste as handlePasteTable } from 'prosemirror-tables'
import { Schema, Slice, Node, Fragment } from 'prosemirror-model'
import { Plugin, PluginKey, TextSelection, Selection } from 'prosemirror-state'
import { closeHistory } from 'prosemirror-history'
import { hasParentNodeOfType } from 'prosemirror-utils'
import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer'

import * as clipboard from '../../../utils/clipboard'
import { EditorAppearance } from '../../../types'
import { insertMediaAsMediaSingle } from '../../media/utils/media-single'
import linkify from '../linkify-md-plugin'
import { escapeLinks, getPasteSource } from '../util'
import { transformSliceToRemoveOpenBodiedExtension } from '../../extension/actions'
import { transformSliceToRemoveOpenLayoutNodes } from '../../layout/utils'
import { linkifyContent } from '../../hyperlink/utils'
import {
  handlePasteIntoTaskAndDecision,
  handlePasteAsPlainText,
  handlePastePreservingMarks,
  handleMacroAutoConvert
} from '../handlers'
import {
  transformSliceToJoinAdjacentCodeBlocks,
  transformSingleLineCodeBlockToCodeMark
} from '../../code-block/utils'
import { queueCardsFromChangedTr } from '../../card/pm-plugins/doc'

export const stateKey = new PluginKey('pastePlugin')

export const md = MarkdownIt('zero', { html: false })

md.enable([
  // Process html entity - &#123;, &#xAF;, &quot;, ...
  'entity',
  // Process escaped chars and hardbreaks
  'escape',

  'newline'
])

// enable modified version of linkify plugin
// @see https://product-fabric.atlassian.net/browse/ED-3097
md.use(linkify)

export function createPlugin(
  schema: Schema,
  editorAppearance?: EditorAppearance
) {
  const atlassianMarkDownParser = new MarkdownTransformer(schema, md)

  return new Plugin({
    key: stateKey,
    props: {
      handlePaste(view, rawEvent, slice) {
        const event = rawEvent as ClipboardEvent
        if (!event.clipboardData) {
          return false
        }

        const text = event.clipboardData.getData('text/plain')
        const html = event.clipboardData.getData('text/html')

        // Bail if copied content has files
        if (clipboard.isPastedFile(event)) {
          if (!html) {
            return true
          }
          /**
           * Microsoft Office, Number, Pages, etc. adds an image to clipboard
           * with other mime-types so we don't let the event reach media
           */
          event.stopPropagation()
        }

        const { state, dispatch } = view
        const { codeBlock, media, decisionItem, taskItem } = state.schema.nodes

        if (handlePasteAsPlainText(slice, event)(state, dispatch, view)) {
          return true
        }

        let markdownSlice: Slice | undefined
        if (text && !html) {
          const doc = atlassianMarkDownParser.parse(escapeLinks(text))
          if (doc && doc.content) {
            markdownSlice = new Slice(
              doc.content,
              slice.openStart,
              slice.openEnd
            )
          }

          // run macro autoconvert prior to other conversions
          if (
            markdownSlice &&
            handleMacroAutoConvert(text, markdownSlice)(state, dispatch, view)
          ) {
            return true
          }
        }

        if (handlePasteIntoTaskAndDecision(slice)(state, dispatch)) {
          return true
        }

        // If we're in a code block, append the text contents of clipboard inside it
        if (text && hasParentNodeOfType(codeBlock)(state.selection)) {
          const tr = closeHistory(state.tr)
          dispatch(tr.insertText(text))
          return true
        }

        if (
          editorAppearance !== 'message' &&
          slice.content.childCount === 1 &&
          slice.content.firstChild!.type === media
        ) {
          return insertMediaAsMediaSingle(view, slice.content.firstChild!)
        }

        // If the clipboard only contains plain text, attempt to parse it as Markdown
        if (text && !html && markdownSlice) {
          if (handlePastePreservingMarks(markdownSlice)(state, dispatch)) {
            return true
          }

          const tr = closeHistory(state.tr)
          tr.replaceSelection(markdownSlice)

          queueCardsFromChangedTr(state, tr)
          dispatch(tr.scrollIntoView())
          return true
        }

        // finally, handle rich-text copy-paste
        if (html) {
          // linkify the text where possible
          slice = linkifyContent(state.schema)(slice)

          // run macro autoconvert prior to other conversions
          if (handleMacroAutoConvert(text, slice)(state, dispatch, view)) {
            return true
          }

          // In case user is pasting inline code,
          // any backtick ` immediately preceding it should be removed.
          const tr = state.tr
          if (
            slice.content.firstChild &&
            slice.content.firstChild.marks.some(
              m => m.type === state.schema.marks.code
            )
          ) {
            const {
              $from: { nodeBefore },
              from
            } = tr.selection
            if (
              nodeBefore &&
              nodeBefore.isText &&
              nodeBefore.text!.endsWith('`')
            ) {
              tr.delete(from - 1, from)
            }
          }

          // get prosemirror-tables to handle pasting tables if it can
          // otherwise, just the replace the selection with the content
          if (handlePasteTable(view, null, slice)) {
            return true
          }

          // ED-4732
          if (handlePastePreservingMarks(slice)(state, dispatch)) {
            return true
          }

          closeHistory(tr)
          tr.replaceSelection(slice)
          tr.setStoredMarks([])
          if (
            tr.selection.empty &&
            tr.selection.$from.parent.type === codeBlock
          ) {
            tr.setSelection(TextSelection.near(
              tr.selection.$from,
              1
            ) as Selection)
          }

          // queue link cards, ignoring any errors
          dispatch(queueCardsFromChangedTr(state, tr))
          return true
        }

        return false
      },
      transformPasted(slice) {
        // We do this separately so it also applies to drag/drop events
        slice = transformSliceToRemoveOpenLayoutNodes(slice, schema)

        /** If a partial paste of bodied extension, paste only text */
        slice = transformSliceToRemoveOpenBodiedExtension(slice, schema)

        /* Bitbucket copies diffs as multiple adjacent code blocks
         * so we merge ALL adjacent code blocks to support paste here */
        slice = transformSliceToJoinAdjacentCodeBlocks(slice)

        slice = transformSingleLineCodeBlockToCodeMark(slice, schema)

        if (
          slice.content.childCount &&
          slice.content.lastChild!.type === schema.nodes.codeBlock
        ) {
          slice = new Slice(
            slice.content.append(
              Fragment.from(schema.nodes.paragraph.createAndFill() as Node)
            ),
            slice.openStart,
            1
          )
        }
        return slice
      },
      transformPastedHTML(html) {
        // Fix for issue ED-4438
        // text from google docs should not be pasted as inline code
        if (html.indexOf('id="docs-internal-guid-') >= 0) {
          html = html.replace(/white-space:pre/g, '')
          html = html.replace(/white-space:pre-wrap/g, '')
        }
        return html
      }
    }
  })
}
