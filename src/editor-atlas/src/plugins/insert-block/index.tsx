import { WithProviders } from '@atlaskit/editor-common'
import * as React from 'react'
import { EditorPlugin } from '../../types'
import { ToolbarSize } from '../../ui/Toolbar'
import WithPluginState from '../../ui/WithPluginState'
import { insertBlockType } from '../block-type/commands'
import { pluginKey as blockTypeStateKey } from '../block-type/pm-plugins/main'
import { emojiPluginKey } from '../emoji/pm-plugins/main'
import { stateKey as hyperlinkPluginKey } from '../hyperlink/pm-plugins/main'
import { startImageUpload } from '../image-upload/pm-plugins/commands'
import { stateKey as imageUploadStateKey } from '../image-upload/pm-plugins/main'
import { pluginKey as layoutStateKey } from '../layout'
import { stateKey as mediaStateKey } from '../media/pm-plugins/main'
import { mentionPluginKey } from '../mentions'
import { pluginKey as placeholderTextStateKey } from '../placeholder-text'
import {
  insertMacroFromMacroBrowser,
  MacroState,
  pluginKey as macroStateKey
} from '../plugin-macro'
import { pluginKey as tablesStateKey } from '../table/pm-plugins/main'
import { pluginKey as typeAheadPluginKey } from '../type-ahead/pm-plugins/main'
import ToolbarInsertBlock from './ui/ToolbarInsertBlock'

const toolbarSizeToButtons = toolbarSize => {
  switch (toolbarSize) {
    case ToolbarSize.XXL:
    case ToolbarSize.XL:
    case ToolbarSize.L:
    case ToolbarSize.M:
      return 6

    case ToolbarSize.S:
      return 2

    default:
      return 0
  }
}

export interface InsertBlockOptions {
  insertMenuItems?: any
  horizontalRuleEnabled?: boolean
  nativeStatusSupported?: boolean
}

const insertBlockPlugin = (options: InsertBlockOptions): EditorPlugin => ({
  primaryToolbarComponent({
    editorView,
    appearance,
    editorActions,
    eventDispatcher,
    providerFactory,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing
  }) {
    const buttons = toolbarSizeToButtons(toolbarSize)
    const renderNode = providers => {
      return (
        <WithPluginState
          plugins={{
            typeAheadState: typeAheadPluginKey,
            blockTypeState: blockTypeStateKey,
            mediaState: mediaStateKey,
            mentionState: mentionPluginKey,
            tablesState: tablesStateKey,
            macroState: macroStateKey,
            hyperlinkState: hyperlinkPluginKey,
            emojiState: emojiPluginKey,
            imageUpload: imageUploadStateKey,
            placeholderTextState: placeholderTextStateKey,
            layoutState: layoutStateKey
          }}
          render={({
            typeAheadState,
            mentionState,
            blockTypeState,
            mediaState,
            tablesState,
            macroState = {} as MacroState,
            hyperlinkState,
            emojiState,
            dateState,
            imageUpload,
            placeholderTextState,
            layoutState
          }) => (
            <ToolbarInsertBlock
              buttons={buttons}
              isReducedSpacing={isToolbarReducedSpacing}
              isDisabled={disabled}
              isTypeAheadAllowed={typeAheadState.isAllowed}
              editorView={editorView}
              tableSupported={!!tablesState}
              actionSupported={!!editorView.state.schema.nodes.taskItem}
              mentionsSupported={!!(mentionState && mentionState.provider)}
              mentionsEnabled={mentionState}
              decisionSupported={!!editorView.state.schema.nodes.decisionItem}
              dateEnabled={!!dateState}
              placeholderTextEnabled={
                placeholderTextState && placeholderTextState.allowInserting
              }
              layoutSectionEnabled={!!layoutState}
              mediaUploadsEnabled={mediaState && mediaState.allowsUploads}
              onShowMediaPicker={mediaState && mediaState.showMediaPicker}
              mediaSupported={!!mediaState}
              imageUploadSupported={!!imageUpload}
              imageUploadEnabled={imageUpload && imageUpload.enabled}
              handleImageUpload={startImageUpload}
              availableWrapperBlockTypes={
                blockTypeState.availableWrapperBlockTypes
              }
              linkSupported={!!hyperlinkState}
              linkDisabled={
                !hyperlinkState ||
                !hyperlinkState.canInsertLink ||
                hyperlinkState.activeLinkMark
              }
              emojiDisabled={!emojiState || !emojiState.enabled}
              insertEmoji={emojiState && emojiState.insertEmoji}
              emojiProvider={providers.emojiProvider}
              nativeStatusSupported={options.nativeStatusSupported}
              horizontalRuleEnabled={options.horizontalRuleEnabled}
              onInsertBlockType={insertBlockType}
              onInsertMacroFromMacroBrowser={insertMacroFromMacroBrowser}
              macroProvider={macroState.macroProvider}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              insertMenuItems={options.insertMenuItems}
              editorActions={editorActions}
            />
          )}
        />
      )
    }

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    )
  }
})

export default insertBlockPlugin
