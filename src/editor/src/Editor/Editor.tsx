import { RemirrorProps } from '@remirror/react'
import * as React from 'react'
import FullEditorLayout from './FullEditorLayout'
import { BoxProps } from '@hennessyevan/aluminum-box'
import { Card, PaneProps } from '../../../layers/index'
import { majorScale } from '../../../scales/index'
import { Omit } from 'utility-types'
import { FormattingOptions } from './types'
import getFormattingOptions from './utils/getFormattingOptions'

export interface EditorProps extends Partial<RemirrorProps> {
  appearance?: 'primary' | 'minimal'
  collapsed?: boolean
  autoFocus?: boolean
  onSave?: any
  toolbarProps?: Partial<PaneProps>
  toolbarComponents?: React.ReactChild
  contentComponents?: React.ReactChild
  formattingOptions?: FormattingOptions
  allowImages?: boolean
}

export default class Editor extends React.Component<
  EditorProps & Omit<BoxProps, 'appearance'>
> {
  static defaultProps = {
    collapsed: false,
    appearance: 'minimal',
    autoFocus: true
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
    const InnerEditor = this.renderEditor(appearance)
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
