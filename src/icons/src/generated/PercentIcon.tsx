import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PercentIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="percent" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </Icon>
    )
  }
}
