import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class MinusIcon extends PureComponent {
  render() {
    return (
      <Icon name="minus" viewBox="0 0 24 24" {...this.props}>
        <line x1="5" y1="12" x2="19" y2="12" />
      </Icon>
    )
  }
}
