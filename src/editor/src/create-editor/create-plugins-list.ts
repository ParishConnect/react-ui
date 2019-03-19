import {
  alignment,
  annotationPlugin,
  basePlugin,
  blockTypePlugin,
  breakoutPlugin,
  cardPlugin,
  clearMarksOnChangeToEmptyDocumentPlugin,
  codeBlockPlugin,
  compositionPlugin,
  editorDisabledPlugin,
  emojiPlugin,
  extensionPlugin,
  fakeTextCursorPlugin,
  floatingToolbarPlugin,
  gapCursorPlugin,
  helpDialogPlugin,
  hyperlinkPlugin,
  imageUploadPlugin,
  indentationPlugin,
  inlineActionPlugin,
  insertBlockPlugin,
  isMultilineContentPlugin,
  layoutPlugin,
  listsPlugin,
  macroPlugin,
  maxContentSizePlugin,
  mediaPlugin,
  mentionsPlugin,
  panelPlugin,
  pastePlugin,
  placeholderPlugin,
  placeholderTextPlugin,
  quickInsertPlugin,
  rulePlugin,
  saveOnEnterPlugin,
  submitEditorPlugin,
  tablesPlugin,
  textColorPlugin,
  textFormattingPlugin,
  typeAheadPlugin,
  unsupportedContentPlugin,
  widthPlugin
} from '../plugins'
import { EditorPlugin, EditorProps } from '../types'

/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
export function getDefaultPluginsList(props: EditorProps): EditorPlugin[] {
  return [
    pastePlugin,
    basePlugin,
    blockTypePlugin,
    placeholderPlugin,
    clearMarksOnChangeToEmptyDocumentPlugin,
    hyperlinkPlugin,
    textFormattingPlugin(props.textFormatting || {}),
    widthPlugin,
    typeAheadPlugin,
    unsupportedContentPlugin,
    editorDisabledPlugin
  ]
}

/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(props: EditorProps): EditorPlugin[] {
  const plugins = getDefaultPluginsList(props)

  if (props.allowBreakout && props.appearance === 'full-page') {
    plugins.push(breakoutPlugin)
  }

  if (props.allowTextAlignment) {
    plugins.push(alignment)
  }

  if (props.allowInlineAction) {
    plugins.push(inlineActionPlugin)
  }

  if (props.allowTextColor) {
    plugins.push(textColorPlugin)
  }

  if (props.allowLists) {
    plugins.push(listsPlugin)
  }

  if (props.allowRule) {
    plugins.push(rulePlugin)
  }

  if (props.media || props.mediaProvider) {
    plugins.push(mediaPlugin(props.media))
  }

  if (props.allowCodeBlocks) {
    const options = props.allowCodeBlocks !== true ? props.allowCodeBlocks : {}
    plugins.push(codeBlockPlugin(options))
  }

  if (props.mentionProvider) {
    plugins.push(mentionsPlugin())
  }

  if (props.emojiProvider) {
    plugins.push(emojiPlugin)
  }

  if (props.allowTables) {
    plugins.push(tablesPlugin(props.allowTables))
  }

  if (props.allowHelpDialog) {
    plugins.push(helpDialogPlugin)
  }

  if (props.saveOnEnter) {
    plugins.push(saveOnEnterPlugin)
  }

  if (props.legacyImageUploadProvider) {
    plugins.push(imageUploadPlugin)

    if (!props.media && !props.mediaProvider) {
      plugins.push(
        mediaPlugin({
          allowMediaSingle: { disableLayout: true },
          allowMediaGroup: false
        })
      )
    }
  }

  if (props.maxContentSize) {
    plugins.push(maxContentSizePlugin)
  }

  if (props.allowPanel) {
    plugins.push(panelPlugin)
  }

  if (props.allowExtension) {
    plugins.push(extensionPlugin)
  }

  if (props.macroProvider) {
    plugins.push(macroPlugin)
  }

  if (props.allowTemplatePlaceholders) {
    const options =
      props.allowTemplatePlaceholders !== true
        ? props.allowTemplatePlaceholders
        : {}
    plugins.push(placeholderTextPlugin(options))
  }

  if (props.allowLayouts) {
    plugins.push(layoutPlugin)
  }

  if (props.UNSAFE_cards) {
    plugins.push(cardPlugin)
  }

  if (props.allowIndentation) {
    plugins.push(indentationPlugin)
  }

  // UI only plugins
  plugins.push(
    insertBlockPlugin({
      insertMenuItems: props.insertMenuItems,
      horizontalRuleEnabled: props.allowRule
    })
  )

  if (props.allowConfluenceInlineComment) {
    plugins.push(annotationPlugin)
  }

  plugins.push(gapCursorPlugin)
  plugins.push(submitEditorPlugin)
  plugins.push(fakeTextCursorPlugin)
  plugins.push(floatingToolbarPlugin)

  if (props.appearance !== 'mobile') {
    plugins.push(quickInsertPlugin)
  }

  if (props.appearance === 'mobile') {
    plugins.push(compositionPlugin)
  }

  if (props.appearance === 'message') {
    plugins.push(isMultilineContentPlugin)
  }

  return plugins
}
