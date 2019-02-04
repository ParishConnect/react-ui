import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class HomeIcon extends PureComponent {
  render() {
    return (
      <Icon name="home" viewBox="0 0 24 24" {...this.props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </Icon>
    )
  }
}
