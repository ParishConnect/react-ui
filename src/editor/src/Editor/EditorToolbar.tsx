import { InjectedRemirrorProps, withRemirror } from '@remirror/react'
import * as React from 'react'
import { Pane } from '../../../layers/index'
import { majorScale } from '../../../scales/index'
import {
  getBlockButtons,
  getHeadingButtons,
  getTextButtons,
  hasBlockButtons,
  hasTextButtons,
  hasHeadingButtons
} from './utils/toolbarButtonFactory'
import { FormattingOptions } from './types'
import { Dialog } from '../../../dialog/index'
import { runAction } from './utils/runAction'
import { splitBoxProps } from '@hennessyevan/aluminum-box'
import { EditorState, EditorView, RemirrorContentType } from '@remirror/core'

export interface ToolbarReturnFunctions {
  state: EditorState
  view: EditorView
  setContent(content: RemirrorContentType, triggerOnChange?: boolean): void
  clearContent(triggerOnChange?: boolean): void
}

interface EditorToolbarProps {
  formattingOptions: FormattingOptions
  toolbarComponents?({
    state,
    view,
    setContent,
    clearContent
  }: ToolbarReturnFunctions): React.ReactChild
  allowImages?: boolean
  linkActivated: boolean
  deactivateLink(): void
  activateLink(): void
  disabled: boolean
}

interface EditorToolbarState {
  uploadPaneOpen: boolean
}

class EditorToolbar extends React.Component<
  EditorToolbarProps & InjectedRemirrorProps,
  EditorToolbarState
> {
  state: EditorToolbarState = { uploadPaneOpen: false }
  openUploadPane = () => this.setState({ uploadPaneOpen: true })
  closeUploadPane = () => this.setState({ uploadPaneOpen: false })

  render() {
    const {
      formattingOptions,
      actions,
      toolbarComponents,
      linkActivated,
      allowImages,
      deactivateLink,
      activateLink,
      disabled,
      state,
      clearContent,
      setContent,
      view,
      ...props
    } = this.props

    const { matchedProps } = splitBoxProps(props)

    return (
      <Pane
        display="flex"
        paddingY={majorScale(1)}
        paddingX={majorScale(1)}
        width="100%"
        appearance="white"
        {...matchedProps}
      >
        <Pane
          display="flex"
          paddingRight={hasBlockButtons({ formattingOptions }) && majorScale(1)}
          borderRight={hasBlockButtons({ formattingOptions })}
        >
          {getHeadingButtons({ formattingOptions, actions, disabled })}
        </Pane>
        <Pane
          display="flex"
          paddingLeft={
            hasHeadingButtons({ formattingOptions }) && majorScale(1)
          }
          paddingRight={hasBlockButtons({ formattingOptions }) && majorScale(1)}
          borderRight={hasBlockButtons({ formattingOptions })}
        >
          {getTextButtons({ formattingOptions, actions, disabled })}
        </Pane>
        <Pane
          display="flex"
          paddingLeft={hasTextButtons({ formattingOptions }) && majorScale(1)}
        >
          {getBlockButtons({
            formattingOptions,
            actions,
            disabled,
            allowImages,
            openUploadPane: this.openUploadPane,
            linkActivated,
            activateLink,
            deactivateLink
          })}
        </Pane>
        {toolbarComponents && (
          <Pane display="flex" marginLeft="auto">
            {typeof toolbarComponents === 'function'
              ? toolbarComponents({
                  state: state.newState,
                  view,
                  clearContent,
                  setContent
                })
              : toolbarComponents}
          </Pane>
        )}
        {allowImages && (
          <Dialog
            onCloseComplete={this.closeUploadPane}
            onConfirm={close => {
              runAction(actions.imageAdd.command)
              close()
            }}
            isShown={this.state.uploadPaneOpen}
          />
        )}
      </Pane>
    )
  }
}

export default withRemirror(EditorToolbar)
