import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class LayoutIcon extends PureComponent {
  render() {
    return (
      <Icon name="layout" viewBox="0 0 24 24" {...this.props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </Icon>
    )
  }
}
