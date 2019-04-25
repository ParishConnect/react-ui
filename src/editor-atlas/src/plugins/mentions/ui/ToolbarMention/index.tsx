import * as React from 'react'
import { PureComponent } from 'react'
import { EditorView } from 'prosemirror-view'

import ToolbarButton from '../../../../ui/ToolbarButton'
import { insertMentionQuery } from '../../commands/insert-mention-query'
import { AtSignIcon } from '../../../../../../icons/index'

export interface Props {
  editorView?: EditorView
  isDisabled?: boolean
}

export interface State {
  disabled: boolean
}

export default class ToolbarMention extends PureComponent<Props> {
  render() {
    return (
      <ToolbarButton
        spacing="none"
        onClick={this.handleInsertMention}
        disabled={this.props.isDisabled}
        title="Mention @"
        iconBefore={AtSignIcon}
      />
    )
  }

  private handleInsertMention = (): boolean => {
    if (!this.props.editorView) {
      return false
    }
    insertMentionQuery()(
      this.props.editorView.state,
      this.props.editorView.dispatch
    )
    return true
  }
}
