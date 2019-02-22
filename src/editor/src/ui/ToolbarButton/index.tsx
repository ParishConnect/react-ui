import * as React from 'react'
import { PureComponent } from 'react'
import { ToolbarButtonFactory } from './styles'
import { Tooltip } from '../../../../tooltip/index'
import { Position, PositionEnum } from '../../../../constants/index'

export interface Props {
  isIconButton?: boolean
  selected?: boolean
  className?: string
  disabled?: boolean
  hideTooltip?: boolean
  href?: string
  target?: string
  icon?: any
  iconAfter?: any
  iconBefore?: any
  onClick?: (event: Event) => void
  spacing?: 'default' | 'compact' | 'none'
  title?: string
  titlePosition?: string
}

export default class ToolbarButton extends PureComponent<Props, {}> {
  render() {
    const InternalButton = () => (
      <ToolbarButtonFactory
        isIconButton={this.props.isIconButton}
        isActive={this.props.selected}
        appearance="minimal"
        className={this.props.className}
        href={this.props.href}
        icon={this.props.icon}
        iconAfter={this.props.iconAfter}
        iconBefore={this.props.iconBefore}
        disabled={this.props.disabled}
        onClick={this.handleClick}
        spacing={this.props.spacing || 'default'}
      >
        {this.props.children}
      </ToolbarButtonFactory>
    )

    const position = (this.props.titlePosition as PositionEnum) || Position.TOP
    const tooltipContent = !this.props.hideTooltip ? this.props.title : null

    return this.props.title ? (
      <Tooltip content={tooltipContent} position={position}>
        <InternalButton />
      </Tooltip>
    ) : (
      <InternalButton />
    )
  }

  private handleClick = (event: Event) => {
    const { disabled, onClick } = this.props

    if (!disabled && onClick) {
      onClick(event)
    }
  }
}
