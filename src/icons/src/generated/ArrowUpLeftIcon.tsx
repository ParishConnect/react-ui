import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowUpLeftIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-up-left" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="17" y1="17" x2="7" y2="7" />
        <polyline points="7 17 7 7 17 7" />
      </Icon>
    )
  }
}
