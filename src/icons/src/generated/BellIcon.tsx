import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class BellIcon extends PureComponent {
  render() {
    return (
      <Icon name="bell" viewBox="0 0 24 24" {...this.props}>
        <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
      </Icon>
    )
  }
}
