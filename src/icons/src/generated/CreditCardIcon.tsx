import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CreditCardIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="credit-card" viewBox="0 0 24 24" {...this.props}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </Icon>
    )
  }
}
