import * as React from 'react'
import { PureComponent } from 'react'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import { EditorView } from 'prosemirror-view'
import { toggleBold, toggleItalic, tooltip } from '../../../../keymaps'
import { TextFormattingState } from '../../pm-plugins/main'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { ButtonGroup } from '../../../../ui/styles'
import { toggleStrong, toggleEm } from '../../commands/text-formatting'
import { BoldIcon, ItalicIcon } from '../../../../../../icons/index'

export const messages = defineMessages({
  bold: {
    id: 'fabric.editor.bold',
    defaultMessage: 'Bold',
    description:
      'This refers to bold or “strong” formatting, indicates that its contents have strong importance, seriousness, or urgency.'
  },
  italic: {
    id: 'fabric.editor.italic',
    defaultMessage: 'Italic',
    description: 'This refers to italics or emphasized formatting.'
  }
})

export interface Props {
  editorView: EditorView
  textFormattingState: TextFormattingState
  disabled?: boolean
  isReducedSpacing?: boolean
}

class ToolbarTextFormatting extends PureComponent<Props & InjectedIntlProps> {
  render() {
    const {
      disabled,
      isReducedSpacing,
      textFormattingState,
      intl: { formatMessage }
    } = this.props
    const {
      strongHidden,
      strongActive,
      strongDisabled,
      emHidden,
      emActive,
      emDisabled
    } = textFormattingState

    const labelBold = formatMessage(messages.bold)
    const labelItalic = formatMessage(messages.italic)
    return (
      <ButtonGroup width={isReducedSpacing ? 'small' : 'large'}>
        {strongHidden ? null : (
          <ToolbarButton
            isIconButton
            spacing={isReducedSpacing ? 'none' : 'default'}
            onClick={this.handleBoldClick}
            selected={strongActive}
            disabled={disabled || strongDisabled}
            title={tooltip(toggleBold, labelBold)}
            icon={BoldIcon}
          />
        )}

        {emHidden ? null : (
          <ToolbarButton
            isIconButton
            spacing={isReducedSpacing ? 'none' : 'default'}
            onClick={this.handleItalicClick}
            selected={emActive}
            disabled={disabled || emDisabled}
            title={tooltip(toggleItalic, labelItalic)}
            icon={ItalicIcon}
          />
        )}
      </ButtonGroup>
    )
  }

  private handleBoldClick = () => {
    const { strongDisabled } = this.props.textFormattingState
    if (!strongDisabled) {
      const { state, dispatch } = this.props.editorView
      return toggleStrong()(state, dispatch)
    }
    return false
  }

  private handleItalicClick = (): boolean => {
    const { emDisabled } = this.props.textFormattingState
    if (!emDisabled) {
      const { state, dispatch } = this.props.editorView
      return toggleEm()(state, dispatch)
    }
    return false
  }
}

export default injectIntl(ToolbarTextFormatting)
