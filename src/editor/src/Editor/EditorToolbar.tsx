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

interface EditorToolbarProps {
  formattingOptions: FormattingOptions
  toolbarComponents?: React.ReactChild
  allowImages?: boolean
  linkActivated: boolean
  deactivateLink(): void
  activateLink(): void
  disabled: boolean
}

class EditorToolbar extends React.Component<
  EditorToolbarProps & InjectedRemirrorProps
> {
  render() {
    const {
      formattingOptions,
      actions,
      toolbarComponents,
      linkActivated,
      allowImages,
      deactivateLink,
      activateLink,
      disabled
    } = this.props

    return (
      <Pane
        display="flex"
        paddingY={majorScale(1)}
        paddingX={majorScale(1)}
        width="100%"
        appearance="white"
        borderBottom
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
            linkActivated,
            activateLink,
            deactivateLink
          })}
        </Pane>
        {toolbarComponents && (
          <Pane display="flex" marginLeft="auto">
            {toolbarComponents}
          </Pane>
        )}
      </Pane>
    )
  }
}

export default withRemirror(EditorToolbar)
