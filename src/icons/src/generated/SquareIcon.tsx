import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class SquareIcon extends PureComponent {
  render() {
    return (
      <Icon name="square" viewBox="0 0 24 24" {...this.props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </Icon>
    )
  }
}
