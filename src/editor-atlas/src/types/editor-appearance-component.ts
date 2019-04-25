import { ExtensionHandlers, ProviderFactory } from '@atlaskit/editor-common'
import { BoxProps } from '@hennessyevan/aluminum-box'
import { EditorView } from 'prosemirror-view'
import EditorActions from '../actions'
import { EventDispatcher } from '../event-dispatcher'
import {
  InsertMenuCustomItem,
  ReactComponents,
  ToolbarUIComponentFactory,
  UIComponentFactory
} from '../types'

export interface EditorAppearanceComponentProps extends BoxProps {
  onUiReady?: (ref) => void
  onSave?: (editorView: EditorView) => void
  onCancel?: (editorView: EditorView) => void

  providerFactory: ProviderFactory
  editorActions?: EditorActions
  editorDOMElement: JSX.Element
  editorView?: EditorView

  eventDispatcher?: EventDispatcher

  maxHeight?: number | string | boolean

  contentComponents?: UIComponentFactory[]
  primaryToolbarComponents?: ToolbarUIComponentFactory[]
  secondaryToolbarComponents?: UIComponentFactory[]

  customContentComponents?: ReactComponents
  customPrimaryToolbarComponents?: ReactComponents
  customSecondaryToolbarComponents?: ReactComponents
  insertMenuItems?: InsertMenuCustomItem[]

  addonToolbarComponents?: ReactComponents

  popupsMountPoint?: HTMLElement
  popupsBoundariesElement?: HTMLElement
  popupsScrollableElement?: HTMLElement

  extensionHandlers?: ExtensionHandlers

  disabled?: boolean
}
