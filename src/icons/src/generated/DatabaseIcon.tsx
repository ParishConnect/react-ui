import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class DatabaseIcon extends PureComponent {
  render() {
    return (
      <Icon name="database" viewBox="0 0 24 24" {...this.props}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </Icon>
    )
  }
}
