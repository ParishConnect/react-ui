import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowUpIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-up" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </Icon>
    )
  }
}
