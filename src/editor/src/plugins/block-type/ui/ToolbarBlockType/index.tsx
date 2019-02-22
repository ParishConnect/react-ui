import * as React from 'react'
import { ReactElement, createElement } from 'react'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style'

import ToolbarButton from '../../../../ui/ToolbarButton'
import { Separator, Wrapper, MenuWrapper } from '../../../../ui/styles'
import { BlockTypeState } from '../../pm-plugins/main'
import { BlockType } from '../../types'
import { BlockTypeMenuItem } from './styled'
import { ButtonGroup } from '@atlaskit/button'

export const messages = defineMessages({
  textStyles: {
    id: 'fabric.editor.textStyles',
    defaultMessage: 'Text styles',
    description: 'Menu provides access to various heading styles or normal text'
  }
})

export interface Props {
  isDisabled?: boolean
  isSmall?: boolean
  isReducedSpacing?: boolean
  pluginState: BlockTypeState
  popupsMountPoint?: HTMLElement
  popupsBoundariesElement?: HTMLElement
  popupsScrollableElement?: HTMLElement
  setBlockType: (string) => void
}

export interface State {
  active: boolean
}

class ToolbarBlockType extends React.PureComponent<
  Props & InjectedIntlProps,
  State
> {
  state = {
    active: false
  }

  render() {
    const { active } = this.state
    const {
      pluginState: {
        currentBlockType,
        blockTypesDisabled,
        availableBlockTypes
      },
      intl: { formatMessage }
    } = this.props

    const isHeadingDisabled = !availableBlockTypes.some(
      blockType => blockType.nodeName === 'heading'
    )

    if (isHeadingDisabled) {
      return null
    }

    const toolbarButtonFactory = (disabled: boolean) => {
      const labelTextStyles = formatMessage(messages.textStyles)
      const items = this.createItems()

      console.log(items)

      return (
        <ButtonGroup>
          {items.map(item => {
            console.log(item)

            return (
              <ToolbarButton
                isIconButton
                key={item.value}
                selected={active}
                disabled={disabled}
                onClick={() => this.handleSelectBlockType(item)}
                title={labelTextStyles}
                icon={TextStyleIcon}
              />
            )
          })}
        </ButtonGroup>
      )
    }

    if (!this.props.isDisabled && !blockTypesDisabled) {
      return (
        <Wrapper>
          {toolbarButtonFactory(false)}
          <Separator />
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        {toolbarButtonFactory(true)}
        <Separator />
      </Wrapper>
    )
  }

  private createItems = () => {
    const {
      intl: { formatMessage }
    } = this.props
    const { currentBlockType, availableBlockTypes } = this.props.pluginState
    const items = availableBlockTypes.reduce(
      (acc, blockType, blockTypeNo) => {
        const isActive = currentBlockType === blockType
        const tagName = blockType.tagName || 'p'
        acc.push({
          content: (
            <BlockTypeMenuItem tagName={tagName} selected={isActive}>
              {createElement(tagName, {}, formatMessage(blockType.title))}
            </BlockTypeMenuItem>
          ),
          value: blockType,
          key: `${blockType}-${blockTypeNo}`,
          // ED-2853, hiding tooltips as shortcuts are not working atm.
          // tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
          // tooltipPosition: 'right',
          isActive
        })
        return acc
      },
      [] as Array<{
        content: ReactElement<any>
        key: string
        value: BlockType
        isActive: boolean
      }>
    )
    return items
  }

  private handleSelectBlockType = item => {
    console.log(item.value)

    const blockType = item.value
    this.props.setBlockType(blockType.name)
    this.setState({ active: false })
  }
}

export default injectIntl(ToolbarBlockType)
