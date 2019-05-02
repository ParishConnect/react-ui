import { BoxProps } from '@hennessyevan/aluminum-box'
import { InjectedRemirrorProps, RemirrorProps } from '@remirror/react'
import * as React from 'react'
import { Overwrite } from 'utility-types'
import { Card, PaneProps } from '../../../layers/index'
import { majorScale } from '../../../scales/index'
import FullEditorLayout from './FullEditorLayout'
import { FormattingOptions } from './types'
import getFormattingOptions from './utils/getFormattingOptions'

export interface EditorPropsBase extends Partial<RemirrorProps> {
  appearance?: 'primary' | 'minimal'
  collapsed?: boolean
  autoFocus?: boolean
  toolbarProps?: Partial<PaneProps>
  toolbarComponents?: React.ReactChild
  contentComponents?: React.ReactChild
  formattingOptions?: FormattingOptions
  allowImages?: boolean
}

type EditorProps = Overwrite<BoxProps, EditorPropsBase>

class Editor extends React.Component<EditorProps> {
  static defaultProps = {
    collapsed: false,
    appearance: 'minimal',
    autoFocus: true,
    onSave: () => {}
  }

  renderEditor = (appearance: any) => {
    switch (appearance) {
      case 'primary':
        return FullEditorLayout
      case 'minimal':
      default:
        return FullEditorLayout
    }
  }

  render() {
    const { collapsed, appearance, formattingOptions, ...props } = this.props
    const InnerEditor = this.renderEditor(appearance) as any
    return collapsed ? (
      <Card background="tint1" border padding={majorScale(2)}>
        Click to Edit
      </Card>
    ) : (
      <InnerEditor
        formattingOptions={getFormattingOptions(formattingOptions)}
        {...props}
      />
    )
  }
}

export default Editor
