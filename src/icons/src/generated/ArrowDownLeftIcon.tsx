import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ArrowDownLeftIcon extends PureComponent {
  render() {
    return (
      <Icon name="arrow-down-left" viewBox="0 0 24 24" {...this.props}>
        <line x1="17" y1="7" x2="7" y2="17" />
        <polyline points="17 17 7 17 7 7" />
      </Icon>
    )
  }
}
