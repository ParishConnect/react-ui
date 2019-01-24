import * as React from 'react'
import styled from 'styled-components'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'

import WrapLeftIcon from '@atlaskit/icon/glyph/editor/media-wrap-left'
import WrapRightIcon from '@atlaskit/icon/glyph/editor/media-wrap-right'
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide'
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width'
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import EditorAlignImageLeft from '@atlaskit/icon/glyph/editor/align-image-left'
import EditorAlignImageRight from '@atlaskit/icon/glyph/editor/align-image-right'
import EditorAlignImageCenter from '@atlaskit/icon/glyph/editor/align-image-center'

import { MediaSingleLayout } from '@atlaskit/adf-schema'
import { colors } from '@atlaskit/theme'

import UiToolbarButton from '../../../../ui/ToolbarButton'
import UiSeparator from '../../../../ui/Separator'
import UiFloatingToolbar from '../../../../ui/FloatingToolbar'
import { closestElement } from '../../../../utils'
import { MediaPluginState } from '../../pm-plugins/main'

export const messages = defineMessages({
  wrapLeft: {
    id: 'fabric.editor.wrapLeft',
    defaultMessage: 'Wrap left',
    description: 'Aligns your image to the left and wraps text around it.'
  },
  wrapRight: {
    id: 'fabric.editor.wrapRight',
    defaultMessage: 'Wrap right',
    description: 'Aligns your image to the right and wraps text around it.'
  }
})

export interface Props {
  target?: HTMLElement
  layout?: MediaSingleLayout
  allowBreakout: boolean
  allowLayout: boolean
  pluginState: MediaPluginState
  allowResizing?: boolean
  editorDisabled?: boolean
}

export type IconMap = { value: string; Icon?: React.ComponentClass<any> }[]

const icons: IconMap = [
  { value: 'align-start', Icon: EditorAlignImageLeft },
  { value: 'center', Icon: EditorAlignImageCenter },
  { value: 'align-end', Icon: EditorAlignImageRight },
  { value: 'separator' },
  { value: 'wrap-left', Icon: WrapLeftIcon },
  { value: 'wrap-right', Icon: WrapRightIcon }
]

const breakoutIcons: IconMap = [
  { value: 'separator' },
  { value: 'wide', Icon: WideIcon },
  { value: 'full-width', Icon: FullWidthIcon }
]

const layoutToMessages = {
  'wrap-left': messages.wrapLeft,
  center: 'align image center',
  'wrap-right': messages.wrapRight,
  wide: 'layout wide',
  'full-width': 'layoutFullWidth',
  'align-end': 'alignImageRight',
  'align-start': 'alignImageLeft'
}

const ToolbarButton = styled(UiToolbarButton)`
  width: 24px;
  padding: 0;
  margin: 0 2px;
`

const Separator = styled(UiSeparator)`
  margin: 2px 6px;
`

// `line-height: 1` to fix extra 1px height from toolbar wrapper
const FloatingToolbar = styled(UiFloatingToolbar)`
  & > div {
    line-height: 1;
  }
  & > div:first-child > button {
    margin-left: 0;
  }
  & > div:last-child > button {
    margin-right: 0;
  }
`

const ToolbarButtonDestructive = styled(ToolbarButton)`
  &:hover {
    color: ${colors.R300} !important;
  }
  &:active {
    color: ${colors.R400} !important;
  }
  &[disabled]:hover {
    color: ${colors.N70} !important;
  }
`

class MediaSingleEdit extends React.Component<Props & InjectedIntlProps, {}> {
  getItems = (allowResizing, allowBreakout) => {
    if (!allowResizing) {
      return icons.concat(breakoutIcons)
    }

    return icons
  }

  render() {
    const { formatMessage } = this.props.intl
    const {
      target,
      layout: selectedLayout,
      allowBreakout,
      allowLayout,
      allowResizing,
      editorDisabled
    } = this.props
    const toolbarIcons = this.getItems(allowResizing, allowBreakout)
    if (
      target &&
      !closestElement(target, 'li') &&
      !closestElement(target, 'table') &&
      !editorDisabled
    ) {
      const labelRemove = formatMessage('remove')
      return (
        <FloatingToolbar
          target={target}
          offset={[0, 12]}
          fitHeight={32}
          alignX="center"
        >
          {allowLayout && (
            <>
              {toolbarIcons.map((layout, index) => {
                // Don't render Wide and Full width button for image smaller than editor content width
                const { value, Icon } = layout

                if (value === 'separator') {
                  return <Separator key={index} />
                }
                const label = formatMessage(layoutToMessages[value])

                return (
                  <ToolbarButton
                    spacing="compact"
                    key={index}
                    selected={value === selectedLayout}
                    onClick={this.handleChangeLayout.bind(this, value)}
                    title={label}
                    iconBefore={Icon && <Icon label={label} />}
                  />
                )
              })}
              <Separator />
            </>
          )}
          <ToolbarButtonDestructive
            spacing="compact"
            onClick={this.handleRemove}
            title={labelRemove}
            iconBefore={<RemoveIcon label={labelRemove} />}
          />
        </FloatingToolbar>
      )
    } else {
      return null
    }
  }

  private handleRemove = () => {
    const { pluginState } = this.props
    pluginState.removeSelectedMediaContainer()
  }

  private handleChangeLayout(layout: MediaSingleLayout) {
    this.props.pluginState.align(layout)
  }
}

export default injectIntl(MediaSingleEdit)
