// Used in products integration code
export { EmojiResource } from '@atlaskit/emoji'
export {
  AbstractMentionResource,
  MentionProvider,
  MentionResource,
  PresenceProvider,
  PresenceResource
} from '@atlaskit/mention'
export { default as EditorActions } from './actions'
export { ReactEditorView } from './create-editor'
export { getDefaultPluginsList } from './create-editor/create-plugins-list'
export { default as getPropsPreset } from './create-editor/get-props-preset'
export { default as Editor } from './editor'
export { EventDispatcher } from './event-dispatcher'
export { blockPluginStateKey, BlockTypeState } from './plugins'
export { insertBlockType, setBlockType } from './plugins/block-type/commands'
export { CardProvider } from './plugins/card'
export {
  indentList,
  outdentList,
  toggleBulletList,
  toggleOrderedList
} from './plugins/lists/commands'
export {
  ListsPluginState as ListsState,
  pluginKey as listsStateKey
} from './plugins/lists/pm-plugins/main'
export {
  CustomMediaPicker,
  DefaultMediaStateManager,
  MediaOptions,
  MediaProvider,
  MediaStateManager
} from './plugins/media'
// Used in mobile bridge
export { stateKey as mediaPluginKey } from './plugins/media/pm-plugins/main'
export { mentionPluginKey, MentionPluginState } from './plugins/mentions'
export {
  ExtensionType,
  MacroAttributes,
  MacroProvider
} from './plugins/plugin-macro'
export {
  QuickInsertItem,
  QuickInsertProvider
} from './plugins/quick-insert/types'
export { createTable } from './plugins/table/actions'
export { textColorPluginKey, TextColorPluginState } from './plugins/text-color'
export { changeColor } from './plugins/text-color/commands/change-color'
export {
  toggleCode,
  toggleEm,
  toggleStrike,
  toggleStrong,
  toggleSubscript,
  toggleSuperscript,
  toggleUnderline
} from './plugins/text-formatting/commands/text-formatting'
export {
  pluginKey as textFormattingStateKey,
  TextFormattingState
} from './plugins/text-formatting/pm-plugins/main'
export { typeAheadPluginKey, TypeAheadPluginState } from './plugins/type-ahead'
export { selectItem } from './plugins/type-ahead/commands/select-item'
export { TypeAheadItem } from './plugins/type-ahead/types'
export { EditorInstance, EditorPlugin, EditorProps } from './types'
export { default as CollapsedEditor } from './ui/CollapsedEditor'
export { default as EditorContext } from './ui/EditorContext'
export {
  PortalProvider,
  PortalProviderAPI,
  PortalRenderer
} from './ui/PortalProvider'
export { default as ToolbarFeedback } from './ui/ToolbarFeedback'
export { default as ToolbarHelp } from './ui/ToolbarHelp'
export { default as WithEditorActions } from './ui/WithEditorActions'
export { default as WithHelpTrigger } from './ui/WithHelpTrigger'
// Used in editor-test-helpers
export { setTextSelection } from './utils'
