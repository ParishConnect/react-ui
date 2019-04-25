import * as React from 'react'
import { ReactElement, createElement } from 'react'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import ToolbarButton from '../../../../ui/ToolbarButton'
import { Separator, Wrapper } from '../../../../ui/styles'
import { BlockTypeState } from '../../pm-plugins/main'
import { BlockType } from '../../types'
import { BlockTypeMenuItem } from './styled'
import { ButtonGroup } from '@atlaskit/button'

export const messages = defineMessages({
  heading1: {
    id: 'fabric.editor.heading1',
    defaultMessage: 'Heading 1',
    description: ''
  },
  heading2: {
    id: 'fabric.editor.heading2',
    defaultMessage: 'Heading 2',
    description: ''
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
  active: string
}

class ToolbarBlockType extends React.PureComponent<
  Props & InjectedIntlProps,
  State
> {
  state = {
    active: ''
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
      const items = this.createItems()

      return (
        <ButtonGroup>
          {items.map(item => {
            const blockType = item.value

            if (blockType.name === 'normal') return
            return (
              <ToolbarButton
                isIconButton
                key={blockType}
                selected={
                  active === blockType.name && active === currentBlockType.name
                }
                disabled={disabled}
                onClick={() => this.handleSelectBlockType(item)}
                title={formatMessage(blockType.title) || ''}
                icon={blockType.icon}
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
    const blockType = item.value
    const { active } = this.state

    if (blockType.name !== active) {
      this.props.setBlockType(blockType.name)
      this.setState({ active: blockType.name })
      return
    }

    this.props.setBlockType('normal')
    this.setState({ active: 'normal' })
  }
}

export default injectIntl(ToolbarBlockType)
