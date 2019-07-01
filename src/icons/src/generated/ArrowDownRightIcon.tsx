import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowDownRightIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-down-right" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="7" y1="7" x2="17" y2="17" />
        <polyline points="17 7 17 17 7 17" />
      </Icon>
    )
  }
}
