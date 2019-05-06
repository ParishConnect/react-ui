import { RemirrorProps } from '@remirror/react'
import * as React from 'react'
import { Overwrite } from 'utility-types'
import { Card, PaneProps } from '../../../layers/index'
import { majorScale } from '../../../scales/index'
import DefaultEditorLayout from './DefaultEditor'
import { ToolbarReturnFunctions } from './EditorToolbar'
import FullEditorLayout from './FullEditorLayout'
import { FormattingOptions } from './types'
import getFormattingOptions from './utils/getFormattingOptions'
import { Text } from '../../../typography/index'
import { BoxProps } from '@hennessyevan/aluminum-box'
import MinimalEditorLayout from './MinimalEditor'

export interface EditorPropsBase extends Partial<RemirrorProps> {
  /**
   * The appearance of the editor
   * @variation `primary` - Use this when the editor is the main focus of the page. i.e. Post Editor
   * @variation `minimal` - Basically the default version without a toolbar.
   * @variation `default` - Used as RTF field.
   */
  appearance?: 'primary' | 'default' | 'minimal'
  /**
   * Sets a collapsed placeholder for the editor
   */
  collapsed?: boolean
  /**
   * Whether the editor should get focus on load.
   *
   * @default false
   */
  autoFocus?: boolean
  /**
   * Props to send to the `Pane` that composes the toolbar.
   */
  toolbarProps?: Partial<PaneProps>
  /**
   * Components that should render on the right side of the toolbar.
   *
   * Passes the editor context to facilitate saving, transforming the document synchronously.
   */
  toolbarComponents?({
    state,
    view,
    setContent,
    clearContent
  }: ToolbarReturnFunctions): React.ReactChild
  /**
   * Components that should immediately appear above the editor but below the toolbar/chrome.
   */
  contentComponents?: React.ReactChild
  /**
   * Pass in false to any formatting options that should not be available to the editor.
   * All options are `true` by default
   */
  formattingOptions?: FormattingOptions
  /**
   * Whether or not to load image processing
   */
  allowImages?: boolean
  /**
   * Extra styles to pass to the default editor styles.
   * @format in CSS Object format
   */
  extraStyles?: BoxProps
}

export type EditorProps = Overwrite<PaneProps, EditorPropsBase>

class Editor extends React.Component<EditorProps> {
  static defaultProps = {
    collapsed: false,
    appearance: 'default',
    autoFocus: true,
    onExpand: () => {},
    onSave: () => {}
  }

  renderEditor = (appearance: string) => {
    switch (appearance) {
      case 'primary':
        return FullEditorLayout
      case 'minimal':
        return MinimalEditorLayout
      case 'default':
      default:
        return DefaultEditorLayout
    }
  }

  render() {
    const {
      collapsed,
      appearance,
      formattingOptions,
      onExpand,
      toolbar,
      ...props
    } = this.props
    const InnerEditor = this.renderEditor(appearance)
    return collapsed ? (
      <Card
        cursor="pointer"
        background="tint1"
        onClick={onExpand}
        border="muted"
        padding={majorScale(2)}
      >
        <Text>Click to Edit</Text>
      </Card>
    ) : (
      <InnerEditor
        toolbar={appearance !== 'minimal' && toolbar}
        formattingOptions={getFormattingOptions(formattingOptions)}
        {...props}
      />
    )
  }
}

export default Editor
