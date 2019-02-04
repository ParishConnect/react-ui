import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ArrowDownIcon extends PureComponent {
  render() {
    return (
      <Icon name="arrow-down" viewBox="0 0 24 24" {...this.props}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </Icon>
    )
  }
}
