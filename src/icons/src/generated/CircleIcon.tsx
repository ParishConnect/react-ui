import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class CircleIcon extends PureComponent {
  render() {
    return (
      <Icon name="circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    )
  }
}
