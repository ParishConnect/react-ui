import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ZapIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="zap" viewBox="0 0 24 24" {...this.props as any}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </Icon>
    )
  }
}
