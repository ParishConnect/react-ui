import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowUpRightIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-up-right" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </Icon>
    )
  }
}
